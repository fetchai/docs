import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = process.env.BACKEND_URL;

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

const createAxiosInstance = (refreshToken: string) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to include the access token in the request headers
  instance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      throw error(error);
    },
  );

  // Add a response interceptor to refresh the access token if it's expired
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Call your refresh token API to get a new access token
        const newAccessToken = await fetchNewAccessToken(refreshToken);
        setAccessToken(newAccessToken);
        // Retry the original request with the new access token
        return axios(originalRequest);
      }
     throw error(error);
    },
  );

  return instance;
};

const fetchNewAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`https://accounts.fetch.ai/v1/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
    const data = await response.json();
    if (response.ok && response.status === 200) {
      return data.access_token;
    }
    if (response.status === 422) {
      throw new CustomError("Refresh token expired", 422);
    }
  } catch (refreshError) {
    throw new CustomError(refreshError.message, 422);
  }
};

export const apiCall = async <T>(
  method: string,
  path: string,
  refreshToken: string,
  {
    params,
    data,
    ...config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: AxiosRequestConfig & { params?: any; data?: any },
): Promise<AxiosResponse<T>> => {
  const axiosInstance = createAxiosInstance(refreshToken);
  return axiosInstance.request<T>({
    method,
    url: path,
    params,
    data,
    ...config,
  });
};
