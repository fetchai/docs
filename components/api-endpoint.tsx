import { Code, Pre } from "nextra/components";
import React, { useState } from "react";
import {
  ApiIntro,
  Col,
  Properties,
  Property,
  Row,
  Tab,
  DropDownTabs,
} from "./mdx";
import axios from "axios";
import { useUserContext } from "theme/fetch-ai-docs/contexts/context-provider";
import router from "next/router";

interface PropertyType {
  name: string;
  type: string;
  description: string;
}

// Helper function to replace path parameters in the URL
const replacePathParameters = (
  path: string,
  pathParameters: Record<string, string> = {},
) => {
  let updatedPath = path;
  for (const param in pathParameters) {
    updatedPath = updatedPath.replace(`{${param}}`, pathParameters[param]);
  }
  return updatedPath;
};

const handleSignin = () => {
  const currentProtocol = window.location.protocol;
  const currentHostname = window.location.hostname;
  const currentPort = window.location.port;
  const redirectUri = `${currentProtocol}//${currentHostname}:${currentPort}/docs/auth`;
  const loginUrl =
    `https://accounts.fetch.ai/login/` +
    `?redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&client_id=docs` +
    `&response_type=code`;
  router.push(loginUrl);
};

const PythonCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  samplePayload?: unknown;
  pathParameters?: Record<string, string>;
}> = ({ method, url, samplePayload, pathParameters }) => {
  let code = ``;
  let actualUrl = url;
  // Replace path parameters in the URL
  for (const param in pathParameters) {
    actualUrl = actualUrl.replace(`{${param}}`, `{pathParameters.${param}}`);
  }
  code = samplePayload
    ? `\
import requests

data = ${JSON.stringify(samplePayload, undefined, 4)}

${
  pathParameters
    ? `pathParameters = ${JSON.stringify(pathParameters, undefined, 4)}`
    : ``
}

requests.${method.toLowerCase()}("${actualUrl}", json=data, headers={
    "Authorization": "bearer <your token here>"
}
    `
    : `\
import requests

${
  pathParameters
    ? `pathParameters = ${JSON.stringify(pathParameters, undefined, 4)}`
    : ``
}

requests.${method.toLowerCase()}("${actualUrl}",, headers={
    "Authorization": "bearer <your token here>"
}
    `;

  return (
    <Pre
      filename="python"
      data-language="python"
      hasCopyCode={true}
      className="nx-pre-code"
    >
      <Code data-lanuage="python" data-theme="default">
        {code}
      </Code>
    </Pre>
  );
};

const JavascriptCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  samplePayload?: unknown;
  pathParameters?: Record<string, string>;
}> = ({ method, url, samplePayload, pathParameters }) => {
  let code = ``;
  let actualUrl = url;
  // Replace path parameters in the URL
  for (const param in pathParameters) {
    actualUrl = actualUrl.replace(`{${param}}`, `{pathParameters.${param}}`);
  }
  code = samplePayload
    ? `\
body = ${JSON.stringify(samplePayload, undefined, 4)}
${
  pathParameters
    ? `pathParameters = ${JSON.stringify(pathParameters, undefined, 4)}`
    : ``
}

await fetch("${actualUrl}", {
  method: ${method.toLowerCase()},
  headers: {
    Authorization: Bearer <your token here>
  },
  body
})`
    : `\
${
  pathParameters
    ? `pathParameters = ${JSON.stringify(pathParameters, undefined, 4)}`
    : ``
}

await fetch("${actualUrl}", {
  method: ${method.toLowerCase()},
  headers: {
    Authorization: Bearer <your token here>
  }
})`;

  return (
    <Pre
      filename="javascript"
      data-lanuage="javascript"
      hasCopyCode={true}
      className="nx-pre-code"
    >
      <Code
        data-lanuage="javascript"
        data-theme="default"
        className="javascript"
      >
        {code}
      </Code>
    </Pre>
  );
};

const CurlCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  samplePayload?: unknown;
}> = ({ method, url, samplePayload }) => {
  let code = `\
curl \\
-X ${method} \\
-H Authorization: bearer <your token here> \\
${url}`;

  if (samplePayload) {
    code += ` \\\n -d '${JSON.stringify(samplePayload)}'`;
  }

  return (
    <Pre filename="bash" hasCopyCode={true} className="nx-pre-code">
      {code.split("\n").map((line) => {
        return (
          <>
            {line}
            <br />
          </>
        );
      })}
    </Pre>
  );
};

const JsonCodeTab: React.FC<{
  samplePayload: unknown;
}> = ({ samplePayload }) => {
  const formattedJson = JSON.stringify(samplePayload, undefined, 2);

  return (
    <Pre className="nx-pre-code" filename="json" hasCopyCode={true}>
      {formattedJson}
    </Pre>
  );
};

export const ApiResponses: React.FC<{
  description?: string;
  samplePayload: unknown;
  properties?: PropertyType[];
}> = (properties) => {
  return (
    <>
      <Row>
        <h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-text-2xl">
          Responses
        </h1>
      </Row>
      <Row>
        <Col>
          {properties.description ? (
            <ApiIntro>{properties.description}</ApiIntro>
          ) : undefined}

          {properties.properties && properties.properties.length > 0 ? (
            <Properties>
              {properties.properties.map((property) => {
                return (
                  <Property
                    key={property.name}
                    name={property.name}
                    type={property.type}
                  >
                    {property.description}
                  </Property>
                );
              })}
            </Properties>
          ) : undefined}
        </Col>
        <Col>
          <DropDownTabs>
            <Tab heading="HTTP 200">
              <JsonCodeTab samplePayload={properties.samplePayload} />
            </Tab>
          </DropDownTabs>
        </Col>
      </Row>
    </>
  );
};

export const ApiRequest: React.FC<{
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  samplePayload?: unknown;
  properties?: PropertyType[];
  pathParameters?: Record<string, string>;
}> = (properties) => {
  return (
    <>
      <Row>
        <h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-text-2xl">
          Request
        </h1>
      </Row>
      <Row>
        <Col>
          {properties.description ? (
            <ApiIntro>{properties.description}</ApiIntro>
          ) : undefined}
          {properties.properties && properties.properties.length > 0 ? (
            <Properties>
              {properties.properties.map((property) => {
                return (
                  <Property
                    key={property.name}
                    name={property.name}
                    type={property.type}
                  >
                    {property.description}
                  </Property>
                );
              })}
            </Properties>
          ) : undefined}
        </Col>
        <Col>
          <DropDownTabs>
            <Tab heading="Curl">
              <CurlCodeTab
                method={properties.method}
                url={properties.apiUrl + properties.path}
                samplePayload={properties.samplePayload}
              />
            </Tab>
            <Tab heading="Python">
              <PythonCodeTab
                method={properties.method}
                url={properties.apiUrl + properties.path}
                samplePayload={properties.samplePayload}
                pathParameters={properties.pathParameters}
              />
            </Tab>
            <Tab heading="Javascript">
              <JavascriptCodeTab
                method={properties.method}
                url={properties.apiUrl + properties.path}
                samplePayload={properties.samplePayload}
                pathParameters={properties.pathParameters}
              />
            </Tab>
          </DropDownTabs>
        </Col>
      </Row>
    </>
  );
};

export const ApiEndpointRequestResponse: React.FC<{
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  samplePayload?: unknown;
  responses?: unknown;
  responseProperties?: PropertyType[];
  responseDescription?: string;
  properties?: PropertyType[];
  pathParameters?: Record<string, string>;
}> = (properties) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestPayload, setRequestPayload] = useState(
    properties.samplePayload
      ? JSON.stringify(properties.samplePayload, null, 2)
      : `{}`,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [actualResponse, setActualResponse] = useState("");
  const [pathParameters, setPathParameters] = useState(
    properties.pathParameters || {},
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const context = useUserContext();

  const hitRequest = async () => {
    try {
      setLoading(true);
      setError("");

      const requestPayloadJSON = JSON.parse(requestPayload);

      const apiUrlWithParams =
        properties.apiUrl +
        replacePathParameters(properties.path, pathParameters);

      const response = await axios({
        method: properties.method,
        url: apiUrlWithParams,
        headers: {
          Authorization: `Bearer ${context?.credentials?.apiKey}`,
        },
        data: requestPayloadJSON,
      });

      const responseText = JSON.stringify(response.data, null, 2);
      setActualResponse(responseText);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Row>
        <p className="nx-endpoint nx-text-base">
          <span className="nextra-content nx-font-medium">Endpoint: </span>
          <span className="nx-endpoint-method nx-text-fetch-main">
            {properties.method}
          </span>{" "}
          <span className="nx-text-purple nx-font-normal">
            {properties.path}
          </span>
          {isModalOpen ? (
            <button
              className="nx-bg-white nx-text-fetch-main nx-py-2 nx-px-4 nx-rounded-xxl"
              onClick={closeModal}
            >
              Cancel
            </button>
          ) : (
            <button
              className="nx-bg-white nx-text-fetch-main nx-py-2 nx-px-4 nx-rounded-xxl"
              onClick={openModal}
            >
              Run Code
            </button>
          )}
        </p>
      </Row>

      {isModalOpen && (
        <div className="nx-bg-grey nx-px-6 nx-py-8 nx-rounded nx-mt-12">
          <div className="nx-bg-white nextra-content nx-py-2 nx-px-4 nx-rounded">
            Parameters
          </div>

          <div className="nx-flex nx-flex-col nx-text-sm">
            <div className="nx-flex nx-mt-4 nx-ml-4">
              <div className="nx-w-1/4">
                <p className="nextra-content nx-text-sm">Name</p>
              </div>
              <div className="nx-w-3/4">
                <p className="nextra-content nx-text-sm">Description</p>
              </div>
            </div>
            <div className="nx-mt-2 nx-mb-4 nx-border-t nx-border-gray-300" />

            {/* Render Path Parameters as input fields */}
            {Object.keys(pathParameters).map((paramName) => (
              <div className="nx-flex nx-items-center nx-ml-4" key={paramName}>
                <div className="nx-w-1/4">
                  <p className="nextra-content nx-text-sm">
                    {paramName} required
                  </p>
                </div>
                <div className="nx-w-3/4">
                  <input
                    type="text"
                    placeholder={paramName}
                    value={pathParameters[paramName]}
                    onChange={(e) => {
                      // Update the path parameter value
                      const updatedPathParameters = { ...pathParameters };
                      updatedPathParameters[paramName] = e.target.value;
                      setPathParameters(updatedPathParameters);
                    }}
                    className="nx-p-2 nx-rounded nx-border nx-border-gray-300 nx-mt-2 nx-w-full"
                  />
                </div>
              </div>
            ))}

            {/* Additional Sample Payload */}
            {requestPayload && (
              <div className="nx-flex nx-items-center  nx-ml-4">
                <div className="nx-w-1/4">
                  <p className="nextra-content nx-text-sm">
                    Additional Sample Payload
                  </p>
                </div>
                <div className="nx-w-3/4">
                  <textarea
                    value={requestPayload}
                    onChange={(e) => setRequestPayload(e.target.value)}
                    className="nx-p-2 nx-rounded nx-border nx-border-gray-300 nextra-content nx-mt-2 nx-h-24 nx-w-full"
                  />
                </div>
              </div>
            )}

            {/* Execute Button */}
            <div className="nx-flex  nx-ml-4">
              <div className="nx-w-1/4">
                <button
                  className="nx-bg-purple hover:nx-bg-purple-500 nx-text-white nx-py-2 nx-px-4 nx-rounded-xxl nx-text-sm nx-mt-6"
                  onClick={context?.isLoggedIn ? hitRequest : handleSignin}
                >
                  Execute
                </button>
              </div>
            </div>

            {loading && <div className="nx-mt-4  nx-ml-4">Loading...</div>}

            {error && (
              <div className="nx-mt-4 nx-text-red-500  nx-ml-4">
                Error: {error}
              </div>
            )}

            {/* Display Actual Response */}
            {actualResponse && (
              <div className="nx-mt-6">
                <div className="nx-bg-white nextra-content nx-text-base nx-py-2 nx-px-4 nx-rounded">
                  Actual Response
                </div>
                <div className="nx-bg-white nx-rounded nx-p-2 nx-mt-4">
                  <pre className="nx-whitespace-pre-wrap">{actualResponse}</pre>
                </div>
              </div>
            )}

            {/* Display Sample Response if Available */}
            {!actualResponse && properties.responses && (
              <div className="nx-mt-6">
                <div className="nx-bg-white nextra-content nx-text-base nx-py-2 nx-px-4 nx-rounded">
                  Sample Response
                </div>
                <div className="nx-bg-white nx-rounded nx-p-2 nx-mt-4">
                  <pre className="nx-whitespace-pre-wrap">
                    {JSON.stringify(properties.responses, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ApiRequest
        apiUrl={properties.apiUrl}
        method={properties.method}
        path={properties.path}
        description={properties.description}
        samplePayload={properties.samplePayload ?? undefined}
        properties={properties.properties ?? undefined}
        pathParameters={properties.pathParameters ?? undefined}
      />
      {properties.responses ? (
        <ApiResponses
          samplePayload={properties.responses ?? undefined}
          properties={properties.responseProperties ?? undefined}
          description={properties.responseDescription ?? undefined}
        />
      ) : undefined}
    </>
  );
};
