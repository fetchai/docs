import { useState } from 'react'

function Hosting() {

  const [activeTab, setActiveTab] = useState(0);


  const apAgentsObjects = [{
    name: "name",
    type: "string",
    description: "The given name of the agent. This is only a label that is used internally so users can keep track of their agents."
  },{
    name: "address",
    type: "string",
    description: "The address of the agent. This is also the current public key of the agent"
  },{
    name: "running",
    type: "boolean",
    description: "The current state of the agent. `true` if the agent is currently running, `false` otherwise."
  },{
    name: "compiled",
    type: "boolean | null",
    description: "The current code compilation status for the agent. `true` if the agent is compiled, `false` if thecompilation failed, `null` if the agent has not been compiled yet."
  },{
    name: "revision",
    type: "integer",
    description: "The current revision of the agent. Everytime an update is made to the agent, the revision is incremented"
  },{
    name: "code_digest", 
    type: "string | null",
    description: "The current digest of the code of the agent. Useful for determining if there have been code changes that need to be applied to the agent.This value can be `null` if the agent has not been compiled yet"
  },{
    name: "wallet_address",
    type: "string | null",
    description: "The wallet address that is associated with the agent. If a wallet address is not associated with the agent, this value will be `null`."
  }]

  const requestItems = [
    {
      heading: 'Curl',
      filename: 'Shell Command',
      code: 'curl -X GET \ -H "Authorization: Bearer ${AGENTVERSE_TOKEN}" \ https://agentverse.ai/v1/hosting/agents'
    },
    {
      heading: 'python',
      filename: 'Using requests',
      code: `import requests
        requests.get('https://agentverse.ai/v1/hosting/agents', headers={
        'Authorization': f'Bearer {token}',
      })`
    },
    {
      heading: 'javascript',
      filename: 'Using fetch API',
      code: "await fetch('https://agentverse.ai/v1/hosting/agents', {method: 'GET',headers: {Authorization: `Bearer ${token}`,}"
    }
  ]

  

  return (
    <section >
      <h2 className= "nx-text-3xl nx-text-black nx-mb-4">Hosting API</h2>
      <p className="nx-text-gray-600 nx-text-md">This is a placeholder incase we want to have a subtitle for a brief description/intro text in article pages. </p>
      <section className="nx-rounded-lg nx-mt-6 nx-pb-6 nx-border-b">
        <h2 className="nx-text-2xl nx-text-black nx-mb-4">Overview</h2>
        <div className="nx-grid md:nx-grid-cols-2 nx-gap-4">
          <div className="nx-w-full md:nx-col-span-1">
            <p className="nx-text-md">The hosting API allows you to manage your agents that are hosted by Agentverse. This involves creating new agents, updating the code of existing agents, starting and stopping agents, and getting logs of agents</p>
          </div>
          <div className="nx-w-full md:nx-col-span-1 nx-bg-gray-100 nx-p-4 nx-rounded-lg">
            <h3 className="nx-text-gray-400 nx-font-semibold nx-mb-2 nx-text-center">Endpoints</h3>
              <div className="nx-flex nx-items-center nx-justify-between nx-rounded-md nx-py-2 nx-px-4 nx-mb-2">
                <code className="nx-flex-1 nx-font-mono nx-text-sm">
                  GET /v1/hosting/agents<br/>
                  POST /v1/hosting/agents<br/>
                  <br/>
                  GET /v1/hosting/agents/:agentAddress<br/>
                  DELETE /v1/hosting/agents/:agentAddres<br/>
                  <br/>
                  GET /v1/hosting/agents/:agentAddress/code<br/>
                  PUT /v1/hosting/agents/:agentAddress/code<br/>
                  <br/>
                  POST /v1/hosting/agents/:agentAddress/star<br/>
                  POST /v1/hosting/agents/:agentAddress/stop<br/>
                  <br/>
                  GET /v1/hosting/agents/:agentAddress/logs/lates<br/>
                  DELETE /v1/hosting/agents/:agentAddress/logs<br/>
                </code>
              </div>
          </div>
        </div>
      </section>

      <section className="nx-rounded-lg nx-mt-6 nx-pb-6 nx-border-b">
        <h2 className="nx-text-2xl nx-text-black nx-mb-4">The Agent Object</h2>
        <div className="nx-grid md:nx-grid-cols-2 nx-gap-4">
          <div className="nx-w-full md:nx-col-span-1">
            {apAgentsObjects.map((agentObject, index) => {
              return <div className={index >= apAgentsObjects.length -1 ? 'nx-py-6' : 'nx-py-6 nx-border-b'}>
                <p className="nx-text-gray-600 nx-text-md nx-font-normal nx-mb-3">{agentObject.name}: <span className="nx-text-gray-400">{agentObject.type}</span></p>
                <p className="nx-text-md">{agentObject.description}</p>
              </div>
            })}
          </div>
          <div className="nx-w-full md:nx-col-span-1 ">
            <div className=' nx-bg-gray-100 nx-p-4 nx-rounded-lg'>
              <h3 className="nx-text-gray-400 nx-font-semibold nx-mb-2 nx-text-center">Endpoints</h3>
              <div className="nx-flex nx-items-center nx-justify-between nx-rounded-md nx-py-2 nx-px-4 nx-mb-2">
                <code className="nx-flex-1 nx-font-mono nx-text-sm [word-break:break-word] ">
                  {
                    `{`
                  }<br/>
                  <div className='nx-ml-4'>
                    "name": "My first agent",<br/>
                    "address": "agent1q2dfhywtt8xazrdyzgap6gzdd7uhk4e0wmc3gjqt42esauaegcm8cuvclpj",<br/>
                    "running": false,<br/>
                    "compiled": true,<br/>
                    "revision": 7,<br/>
                    "code_digest": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",<br/>
                    "wallet_address": "fetch1dtwgzm6km4394erexa8ka05wva306wt9cc3mwk"<br/>
                  </div>
                  {
                    `}`
                  }<br/>
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nx-rounded-lg nx-mt-6 nx-pb-6 nx-border-b">
        <h2 className="nx-text-2xl nx-text-black nx-mb-4">Getting a list of your agents</h2>
        <div className='nx-flex nx-mb-8'>
          <div className='nx-bg-blue-light nx-p-4 nx-rounded-md nx-flex'>
            <p className='nx-font-semibold nx-my-auto'>Endpoint:</p>
            <div className='nx-bg-green nx-px-2 nx-py-1 nx-rounded-sm nx-mx-4'>
              <p className='nx-font-monaco'>GET</p>
            </div>
            <p className='nx-my-auto nx-text-purple'>/v1/hosting/agents</p>
          </div>
        </div>
        <div className="nx-grid md:nx-grid-cols-2 nx-gap-4">
          <div className="nx-w-full md:nx-col-span-1">
            <h2 className="nx-text-xl nx-text-black nx-mb-2">Request</h2>
            <h2 className="nx-text-gray-700 nx-mb-1">Parameters</h2>
            <h2 className="nx-text-gray-500">no parameters</h2>
          </div>
          <div className="nx-w-full md:nx-col-span-1 ">
            <select
              className="nx-block nx-px-4 nx-py-2 nx-pr-8 nx-rounded-md nx-border nx-border-black/20 nx-mb-2"
              value={activeTab}
              onChange={(e) => setActiveTab(parseInt(e.target.value))}
              >
              {requestItems.map((tab, index) => (
                <option key={index} value={index}>
                  {tab.heading}
                </option>
              ))}
            </select>

            <div className=' nx-bg-gray-100 nx-p-4 nx-rounded-lg'>
              <h3 className="nx-text-gray-400 nx-font-semibold nx-mb-2 nx-text-center">{requestItems[activeTab].filename}</h3>
              <code className="nx-flex-1 nx-text-sm">
                {requestItems[activeTab].code}
              </code>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default function MyApp() {
  return <Hosting />
}
