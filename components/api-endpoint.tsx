import {Code, Pre} from 'nextra/components';
import React from 'react';
import {ApiIntro, Col, Properties, Property, Row, Tab, DropDownTabs} from "./mdx";

interface PropertyType {
  name: string;
  type: string;
  description: string;
}

const PythonCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  samplePayload?: unknown
}> = ({method, url, samplePayload}) => {

  let code = ``
  code = samplePayload ? `\
import requests

data = ${JSON.stringify(samplePayload, undefined, 4)}

requests.${method.toLowerCase()}("${url}", json=data, headers={
    "Authorization": "bearer <your token here>"
}
    ` : `\
import requests

requests.${method.toLowerCase()}("${url}",, headers={
    "Authorization": "bearer <your token here>"
}
    `;

  return (
      <Pre filename="python" data-language="python" hasCopyCode={true} className="nx-pre-code">
        <Code data-lanuage="python" data-theme="default">
          {code}
        </Code>
      </Pre>
  );
}

const JavascriptCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  samplePayload?: unknown
}> = ({method, url, samplePayload}) => {

  let code = ``
  code = samplePayload ? `\
body = ${JSON.stringify(samplePayload, undefined, 4)}

await fetch("${url}", {
  method: ${method.toLowerCase()},
  headers: {
    Authorization: Bearer <your token here>
  },
  body
})` : `\
await fetch("${url}", {
  method: ${method.toLowerCase()},
  headers: {
    Authorization: Bearer <your token here>
  }
})`;
  
  return (
    <Pre filename="javascript" data-lanuage="javascript" hasCopyCode={true} className="nx-pre-code">
      <Code data-lanuage="javascript" data-theme="default" className="javascript">
        {code}
      </Code>
    </Pre>
  );
}


const CurlCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  samplePayload?: unknown
}> = ({method, url, samplePayload}) => {
  let code = `\
curl \\
-X ${method} \\
-H Authorization: bearer <your token here> \\
${url}`

  if (samplePayload) {
    code += ` \\\n -d '${JSON.stringify(samplePayload)}'`
  }

  return (
    <Pre filename="bash" hasCopyCode={true} className="nx-pre-code">
      {code.split("\n").map((line) => {
        return (
          <>
            {line}
            <br/>
          </>
        );
      })}
    </Pre>
  );
}


const JsonCodeTab: React.FC<{
  samplePayload: unknown
}> = ({samplePayload}) => {
  const formattedJson = JSON.stringify(samplePayload, undefined, 2);

  return (
    <Pre className="nx-pre-code" filename="json" hasCopyCode={true}>
      {formattedJson}
    </Pre>
  );
}


export const ApiResponses: React.FC<{
  description?: string,
  samplePayload: unknown,
  properties?: PropertyType[]
}> = (properties) => {
  return (
    <>
      <Row><h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-text-2xl">Responses</h1></Row>
      <Row>
        <Col>
          {properties.description ? <ApiIntro>
            {properties.description}
          </ApiIntro> : undefined}

          {properties.properties && properties.properties.length > 0 ? <Properties>
            {properties.properties.map(property => {
              return <Property key={property.name} name={property.name} type={property.type}>
                {property.description}
              </Property>
            })}
          </Properties> : undefined}
        </Col>
        <Col>
          <DropDownTabs>
            <Tab heading="HTTP 200">
              <JsonCodeTab samplePayload={properties.samplePayload}/>
            </Tab>
          </DropDownTabs>
        </Col>
      </Row>
    </>
  )
};



export const ApiRequest: React.FC<{
    apiUrl: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    description: string,
    samplePayload?: unknown,
    properties?: PropertyType[]
}> = (properties) => {
    return (
      <>
        <Row><h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-text-2xl">Request</h1></Row>
        <Row>
          <Col>
            {properties.description ? <ApiIntro>
              {properties.description}
            </ApiIntro> : undefined}
            {properties.properties && properties.properties.length > 0 ? <Properties>
              {properties.properties.map(property => {
                return <Property key={property.name} name={property.name} type={property.type}>
                  {property.description}
                </Property>
              })}
            </Properties> : undefined}
          </Col>
          <Col>
            <DropDownTabs>
              <Tab heading="Curl">
                <CurlCodeTab method={properties.method} url={properties.apiUrl + properties.path} samplePayload={properties.samplePayload}/>
              </Tab>
              <Tab heading="Python">
                <PythonCodeTab method={properties.method} url={properties.apiUrl + properties.path} samplePayload={properties.samplePayload}/>
              </Tab>
              <Tab heading="Javascript">
                <JavascriptCodeTab method={properties.method} url={properties.apiUrl + properties.path} samplePayload={properties.samplePayload}/>
              </Tab>
            </DropDownTabs>
          </Col>
        </Row>
      </>
    )
};

export const ApiEndpointRequestResponse: React.FC<{
  apiUrl: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  description: string,
  samplePayload?: unknown,
  responses?: unknown,
  responseProperties?: PropertyType[],
  responseDescription?: string,
  properties?: PropertyType[]
}> = (properties) => {
  return (
    <>
      <Row><p className="nx-endpoint nx-text-base"><span className="nextra-content nx-font-medium">Endpoint: </span><span className="nx-endpoint-method nx-text-fetch-main">{properties.method}</span> <span className="nx-text-purple nx-font-normal">{properties.path}</span></p></Row>

      <ApiRequest apiUrl={properties.apiUrl} method={properties.method} path={properties.path} description={properties.description} samplePayload={properties.samplePayload ?? undefined} properties={properties.properties ?? undefined}/>
      {
        properties.responses ? <ApiResponses samplePayload={properties.responses ?? undefined} properties={properties.responseProperties ?? undefined} description={properties.responseDescription ?? undefined}/> : undefined
      }
      
    </>
  )
};


