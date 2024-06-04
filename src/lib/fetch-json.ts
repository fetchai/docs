export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}

export default async function fetchJson<Response>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  if (
    init &&
    init.method &&
    !init.method.includes("GET") &&
    init.body &&
    init.body
  ) {
    init.body = JSON.stringify(init.body);
    if (!init.headers) {
      init.headers = {};
    }
    init.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(input, init);
  const data = await response.json();
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}
