# Register in the Almanac contract

A μAgent can communicate in a remote fashion with another across different locations on the internet. This is achievable by  using the μAgent  address to _register into the Almanac contract_ ( by first paying a small fee), and then _querying the Almanac to retrieve an HTTP endpoint_ of a recipient μAgent.

Whenever a μAgent registers in the Almanac, it must specify the service **endpoints** that it provides alongside a **weight parameter** for each endpoint provided. Then, when any agent tries to communicate with this μAgent, the service endpoint will be chosen using a weighted random selection.

## Endpoint weighting

There exist _two format_ options when defining your agent's endpoints: 

- **List format**: This defines the μAgent's endpoints as a list of strings. The weights will be automatically assigned a value of 1.

    ```py
    agent = Agent(
        name="alice",
        port=8000,
        seed="agent secret phrase",
        endpoint=["http://127.0.0.1:8000/submit","http://127.0.0.1:8001/submit"]
    )
    ```

- **Dictionary format**: This defines the μAgent's endpoints in a Dict format, specifying the weight for each endpoint. If the weight parameter is not specified, it will be assigned a value of 1.

    ```py
    agent = Agent(
        name="alice",
        port=8000,
        seed="agent recovery seed phrase",
        endpoint={
            "http://127.0.0.1:8000/submit": {"weight": 2},
            "http://127.0.0.1:8001/submit": {}, # weight value = 1
        },
    )
    ```

## Registration

The Almanac contract requires μAgents to pay a fee for registration using their **Agent Address**, and thus to be found by other agents on the network.

Therefore, it is essential for μAgents to have funds available in their **Fetch Network Address**. 

Registering a μAgent within the Almanac requires to import:

- The **Agent** class from the **uagents** library to create our μAgent.
- The **fund_agent_if_low** class from the **uagents.setup** module, which you can use _on the Fetch.ai testnet_ to run the function **fund_agent_if_low()**. This function will check if you have enough tokens to register in the Almanac contract. If not it will add tokens to your Fetch Network address. Make sure to add a **seed** to your agent, so you don't have to fund different addresses each time you run your agent. 

As previously highlighted, μAgents can communicate by querying the Almanac and retrieving an **HTTP endpoint** from the recipient μAgent. Therefore, we need to specify the service endpoints when defining our μAgent:

```py
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

Here we defined a local http address, but you can also define a remote address to allow agent communication over different machines through the internet. Once you run your script, your μAgent will start the registration process, the balance of the μAgent's wallet will be checked and be funded if needed. Then, you will be ready to start to a [remote communication](uagents-remote-communication.md) with other μAgents registered within the Almanac contract.

For further information on how to set up your μAgents and register them into the Almanac to allow for remote communication, visit the [μAgents Remote Communications](uagents-remote-communication.md) tutorial available in the tutorials section. 
