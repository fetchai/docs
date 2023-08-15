import {Code, Pre} from 'nextra/components';
import React from 'react';
import {ApiIntro, Col, Properties, Property, Row, Section, Tab, Tabs} from "./mdx";


const PythonCodeTab: React.FC<{
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    samplePayload?: any
}> = ({method, url, samplePayload}) => {
    let code = `\
import requests

data = ${JSON.stringify(samplePayload, null, 4)}

requests.${method.toLowerCase()}("${url}", json=data, headers=\{
    "Authorization": "bearer <your token here>"
}
`

    return (
        <Pre filename="python">
            <Code className="shiki" data-lanuage="python">
                {code.split("\n").map((line, index) => {
                    return (
                        <>
                            {line}
                            <br/>
                        </>
                    );
                })}
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
        <Pre filename="bash" hasCopyCode={true}>
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


const ApiEndpoint: React.FC<{
    apiUrl: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    description: string,
    samplePayload?: any
}> = (props) => {
    return (
        <>
            <Row>
                <ApiIntro>
                    {props.description}
                </ApiIntro>

            </Row>

            <Row><h2 className="text-lg font-bold">Request</h2></Row>
            <Row>
                <Col>
                    <Properties>
                        <Property name="id" type="string">
                            Unique identifier for the message.
                        </Property>
                        <Property name="conversation_id" type="string">
                            Unique identifier for the conversation the message belongs to.
                        </Property>
                        <Property name="contact" type="object">
                            The contact object for the contact who sent the message.
                        </Property>
                        <Property name="message" type="string">
                            The message content.
                        </Property>
                        <Property name="reactions" type="array">
                            An array of reaction objects associated with the message.
                        </Property>
                        <Property name="attachments" type="array">
                            An array of attachment objects associated with the message.
                        </Property>
                        <Property name="read_at" type="timestamp">
                            Timestamp of when the message was read.
                        </Property>
                        <Property name="created_at" type="timestamp">
                            Timestamp of when the message was created.
                        </Property>
                        <Property name="updated_at" type="timestamp">
                            Timestamp of when the message was last updated.
                        </Property>
                    </Properties>
                </Col>
                <Col>

                    <Tabs>
                        <Tab header="curl">
                            <CurlCodeTab method={props.method} url={props.apiUrl + props.path}
                                         samplePayload={props.samplePayload}/>
                        </Tab>
                        <Tab header="python">
                            <PythonCodeTab method={props.method} url={props.apiUrl + props.path}
                                           samplePayload={props.samplePayload}/>
                        </Tab>
                    </Tabs>

                </Col>
            </Row>
        </>
    )
};

export default ApiEndpoint;

