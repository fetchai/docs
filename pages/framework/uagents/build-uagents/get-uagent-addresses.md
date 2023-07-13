# Get μAgent addresses

To check your μAgent's addresses, first create your μAgent and then use the **print()** function to retrieve them:

``` py
from uagents import Agent

alice = Agent(name="alice", seed="alice recovery phrase")

print("uAgent address: ", alice.address)
print("Fetch network address: ", alice.wallet.address())
```

Each μAgent is identified by 2 types of _addresses_:

- **μAgent address**, which is the μAgent's main identifier. Other μAgents can use this to query the μAgent's information in the Almanac contract.
- **Fetch network address**, which provides the μAgent with the capabilities for interacting with the Fetch ledger, such as registering in the Almanac contract.
