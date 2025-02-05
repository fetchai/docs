import { Code, Pre } from "nextra/components";
import { CodeBlock } from "./code";

import React from "react";
import { ApiIntro, Properties, Property, Row } from "./mdx";

interface PropertyType {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

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
})
    `
    : `\
import requests

${
  pathParameters
    ? `pathParameters = ${JSON.stringify(pathParameters, undefined, 4)}`
    : ``
}

requests.${method.toLowerCase()}("${actualUrl}", headers={
    "Authorization": "bearer <your token here>"
})
    `;

  return (
    <Pre>
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
    <Pre>
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

const escapeQuotes = (jsonObject) => {
  const jsonString = JSON.stringify(jsonObject);
  const escapedString = jsonString.replaceAll(/(?<!\\)"/g, '"');
  return escapedString;
};

const CurlCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  samplePayload?: unknown;
  isBearerTokenRequired?: boolean;
}> = ({ method, url, samplePayload, isBearerTokenRequired }) => {
  let code = `
curl -X ${method}
${
  isBearerTokenRequired
    ? ` -H "Authorization: bearer <your token here>" -H "Content-Type: application/json"\n `
    : ""
}${url}`;

  if (samplePayload) {
    code += ` -d ${JSON.stringify(escapeQuotes(samplePayload))}`;
  }

  return (
    <Pre>
      <Code data-lanuage="bash" data-theme="default">
        {code.split("\n").map((line) => {
          return (
            <>
              {line}
              <br />
            </>
          );
        })}
      </Code>
    </Pre>
  );
};

const JsonCodeTab: React.FC<{
  samplePayload: unknown;
}> = ({ samplePayload }) => {
  const formattedJson = JSON.stringify(samplePayload, undefined, 2);

  return <Pre>{formattedJson}</Pre>;
};

export const ApiRequestResponseCombined: React.FC<{
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  samplePayload?: unknown;
  properties?: PropertyType[];
  pathParameters?: Record<string, string>;
  isBearerTokenRequired?: boolean;
  responseDescription?: string;
  responses: unknown;
  responseProperties?: PropertyType[];
}> = (properties) => {
  return (
    <div className="nx-flex nx-col-container nx-justify-between nx-gap-6 nx-height-adjust">
      <div className="nx-flex-grow">
        <Row>
          <div className="nx-endpoint nx-flex nx-text-base">
            <div className="nx-flex nx-items-center">
              <span className="nextra-content nx-text-sm nx-font-medium dark:nx-text-white-60">
                Endpoint:
              </span>
              <span className="nx-endpoint-method nx-ml-2 nx-text-sm nx-text-fetch-main dark:nx-text-white-90 dark:nx-bg-green-700">
                {properties.method}
              </span>
            </div>
            <span className="nx-text-purple nx-text-path nx-font-normal nx-text-sm dark:nx-text-indigo-250">
              {properties.path}
            </span>
          </div>
        </Row>

        <div className="nx-flex nx-flex-col nx-gap-12">
          <div>
            <h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-white-90 nx-text-2xl">
              Request
            </h1>

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
                      required={property?.required}
                      type={property.type}
                    >
                      {property.description}
                    </Property>
                  );
                })}
              </Properties>
            ) : undefined}
          </div>
          <div>
            <h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-white-90 nx-text-2xl">
              Responses
            </h1>
            <div className="nx-pt-4 nx-gap-8">
              {properties.responseDescription ? (
                <ApiIntro>{properties.responseDescription}</ApiIntro>
              ) : undefined}

              {properties.responseProperties &&
              properties.responseProperties.length > 0 ? (
                <Properties>
                  {properties.responseProperties.map((property) => {
                    return (
                      <Property
                        key={property.name}
                        name={property.name}
                        required={property?.required}
                        type={property.type}
                      >
                        {property.description}
                      </Property>
                    );
                  })}
                </Properties>
              ) : undefined}
            </div>
          </div>
        </div>
      </div>

      <div className="nx-flex nx-flex-col nx-gap-12 nx-blocks-margin nx-sticky nx-top-24 nx-self-start">
        <CodeBlock
          hasCopy={true}
          codeBlocks={[
            {
              filename: "Curl",
              component: (
                <CurlCodeTab
                  method={properties.method}
                  url={properties.apiUrl + properties.path}
                  samplePayload={properties.samplePayload}
                  isBearerTokenRequired={properties.isBearerTokenRequired}
                />
              ),
            },
            {
              filename: "Python",
              component: (
                <PythonCodeTab
                  method={properties.method}
                  url={properties.apiUrl + properties.path}
                  samplePayload={properties.samplePayload}
                  pathParameters={properties.pathParameters}
                />
              ),
            },
            {
              filename: "JavaScript",
              component: (
                <JavascriptCodeTab
                  method={properties.method}
                  url={properties.apiUrl + properties.path}
                  samplePayload={properties.samplePayload}
                  pathParameters={properties.pathParameters}
                />
              ),
            },
          ]}
        />
        <CodeBlock
          hasCopy={true}
          codeBlocks={[
            {
              filename: "HTTP 200",
              component: <JsonCodeTab samplePayload={properties.responses} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

type SamplePayload = {
  code?: unknown;
  [key: string]: unknown;
};

export const ApiEndpointRequestResponse: React.FC<{
  apiUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  samplePayload?: SamplePayload;
  responses?: unknown;
  responseProperties?: PropertyType[];
  responseDescription?: string;
  properties?: PropertyType[];
  pathParameters?: Record<string, string>;
  isBearerTokenRequired?: boolean;
}> = ({ isBearerTokenRequired = true, ...properties }) => {
  return (
    <>
      <ApiRequestResponseCombined
        apiUrl={properties.apiUrl}
        method={properties.method}
        path={properties.path}
        description={properties.description}
        samplePayload={properties.samplePayload ?? undefined}
        properties={properties.properties ?? undefined}
        pathParameters={properties.pathParameters ?? undefined}
        isBearerTokenRequired={isBearerTokenRequired}
        responses={properties.responses ?? undefined}
        responseProperties={properties.responseProperties ?? undefined}
        responseDescription={properties.responseDescription ?? undefined}
      />
    </>
  );
};
