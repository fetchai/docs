# Register in the Almanac contract

μAgents can communicate in a remote fashion with one another across different locations on the internet. This is achievable by  using the μAgent  address to _register into the Almanac contract_ ( by first paying a small fee), and then _querying the Almanac to retrieve an HTTP endpoint_ of a recipient μAgent.

Whenever μAgents registers in the Almanac, they must specify the service **endpoints** that it provides alongside a **weight parameter** for each endpoint provided. Then, when any agent tries to communicate with this μAgent, the service endpoint will be chosen using a weighted random selection.

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

You can now head towards the dedicated guide showing you how to [register in the Almanac Contract](/docs/guides/agents/register-in-almanac.md) and enable remote communications between different μAgents.
