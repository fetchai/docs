# μAgents addresses

Use the **print()** function to check your μAgent's addresses:

``` py
from uagents import Agent

alice = Agent(name="alice", seed="alice recovery phrase")

print("uAgent address: ", alice.address)
print("Fetch network address: ", alice.wallet.address())
```

Each μAgent is identified by 2 types of _addresses_:

- **μAgent address**: it is the μAgent's main identifier. Other μAgents can use this to query the μAgent's information in the Almanac contract.
- **Fetch network address**: it provides the μAgent with the capabilities for interacting with the Fetch ledger (e.g.,register in the Almanac contract).
