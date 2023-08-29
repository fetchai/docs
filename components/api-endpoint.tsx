import {Code, Pre} from 'nextra/components';
import React from 'react';
import {ApiIntro, Col, Properties, Property, Row, Section, Tab, DropDownTabs} from "./mdx";

interface PropertyType {
  name: string;
  type: string;
  description: string;
}

const PythonCodeTab: React.FC<{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  samplePayload?: any
}> = ({method, url, samplePayload}) => {

  let code = ``
  if(samplePayload) {
    code = `\
import requests

data = ${JSON.stringify(samplePayload, null, 4)}

requests.${method.toLowerCase()}("${url}", json=data, headers=\{
    "Authorization": "bearer <your token here>"
}
    `
  } else {
    code = `\
import requests

requests.${method.toLowerCase()}("${url}",, headers=\{
    "Authorization": "bearer <your token here>"
}
    `
  }

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
  samplePayload?: any
}> = ({method, url, samplePayload}) => {

  let code = ``
  if (samplePayload) {
    code = `\
body = ${JSON.stringify(samplePayload, null, 4)}

await fetch("${url}", {
  method: ${method.toLowerCase()},
  headers: {
    Authorization: Bearer <your token here>
  },
  body
})`
  } else {
    code = `\
await fetch("${url}", {
  method: ${method.toLowerCase()},
  headers: {
    Authorization: Bearer <your token here>
  }
})`
  }
  
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
  samplePayload?: any
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
      {code.split("\n").map((line, index) => {
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
  samplePayload: any
}> = ({samplePayload}) => {
  const formattedJson = JSON.stringify(samplePayload, null, 2);

  return (
    <Pre className="nx-pre-code" filename="json" hasCopyCode={true}>
      {formattedJson}
    </Pre>
  );
}


export const ApiResponses: React.FC<{
  description?: string,
  samplePayload: any,
  properties?: PropertyType[]
}> = (props) => {
  return (
    <>
      <Row><h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-text-2xl">Responses</h1></Row>
      <Row>
        <Col>
          {props.description ? <ApiIntro>
            {props.description}
          </ApiIntro> : null}

          {props.properties && props.properties.length ? <Properties>
            {props.properties.map(property => {
              return <Property name={property.name} type={property.type}>
                {property.description}
              </Property>
            })}
          </Properties> : null}
        </Col>
        <Col>
          <DropDownTabs>
            <Tab heading="HTTP 200">
              <JsonCodeTab samplePayload={props.samplePayload}/>
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
    samplePayload?: any,
    properties?: PropertyType[]
}> = (props) => {
    return (
      <>
        <Row><h1 className="nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-text-2xl">Request</h1></Row>
        <Row>
          <Col>
            {props.description ? <ApiIntro>
              {props.description}
            </ApiIntro> : null}
            {props.properties && props.properties.length ? <Properties>
              {props.properties.map(property => {
                return <Property name={property.name} type={property.type}>
                  {property.description}
                </Property>
              })}
            </Properties> : null}
          </Col>
          <Col>
            <DropDownTabs>
              <Tab heading="Curl">
                <CurlCodeTab method={props.method} url={props.apiUrl + props.path} samplePayload={props.samplePayload}/>
              </Tab>
              <Tab heading="Python">
                <PythonCodeTab method={props.method} url={props.apiUrl + props.path} samplePayload={props.samplePayload}/>
              </Tab>
              <Tab heading="Javascript">
                <JavascriptCodeTab method={props.method} url={props.apiUrl + props.path} samplePayload={props.samplePayload}/>
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
  samplePayload?: any,
  responses?: any,
  responseProperties?: PropertyType[],
  responseDescription?: string,
  properties?: PropertyType[]
}> = (props) => {
  return (
    <>
      <Row><p className="nx-endpoint nx-text-base"><span className="nextra-content nx-font-medium">Endpoint: </span><span className="nx-endpoint-method nx-text-fetch-main">{props.method}</span> <span className="nx-text-purple nx-font-normal">{props.path}</span></p></Row>

      <ApiRequest apiUrl={props.apiUrl} method={props.method} path={props.path} description={props.description} samplePayload={props.samplePayload ? props.samplePayload : null} properties={props.properties ? props.properties : null}/>
      {
        props.responses ? <ApiResponses samplePayload={props.responses ? props.responses : null} properties={props.responseProperties ? props.responseProperties : null} description={props.responseDescription ? props.responseDescription : null}/> : null
      }
      
    </>
  )
};


