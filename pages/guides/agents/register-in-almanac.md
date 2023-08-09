# Registering in the Almanac Contract
## Introduction
The Almanac contract requires μAgents to register using their **Agent Address** and pay a fee for registration to be found by other agents on the network. Therefore, it is essential for μAgents to have enough funds available in their **Fetch Network Address**. 

For further information on **μAgents addresses**, have a look at our [addresses guide ↗️](/guides/agents/getting-uagent-address.md).

As highlighted in [Registration and Endpoints Weighting ↗️](/references/contracts/uagents-almanac/endpoints.md), μAgents can communicate by querying the Almanac and retrieving an **endpoint** from the recipient μAgent. Therefore, we need to specify the service endpoints when defining our μAgent.

## Walk-through

1. First of all, create a Python script and name it: `touch registration.py`
2. Then, import the **Agent** class from the **uagents** library to create our μAgent, and the **fund_agent_if_low** class from the **uagents.setup** module, which we can use _on the Fetch.ai testnet_ to run the function **fund_agent_if_low**. This function will check if you have enough tokens to register in the Almanac contract. If not it will add tokens to your **Fetch Network address**. Then, create a agent, alice, providing **name**, **port**, **seed**, and **endpoint**.
    
    ```py copy filename="registration.py"
    from uagents.setup import fund_agent_if_low
    from uagents import Agent
    
    alice = Agent(
        name="alice",
        port=8000,
        seed="alice secret phrase",
        endpoint=["http://127.0.0.1:8000/submit"],
    )
    
    fund_agent_if_low(alice.wallet.address())
    ```

    Here we defined a local http address, but you can also define a remote address to allow agent communication over different machines through the internet. Once you run your script, your μAgent will start the registration process, the balance of the μAgent's wallet will be checked and be funded if needed. Then, we will be ready to start to a remote communication with other μAgents registered within the Almanac contract.

For further information on how to set up your μAgents and register them into the Almanac to allow for remote communication, visit the [Communicating with other μAgents 📱🤖 ↗️](/guides/agents/communicating-with-other-agents.md) guide.
