# Getting a μAgent address

You can print your μAgent's addresses in the following way:

1. First of all create a Python script and name it: `touch address.py`
2. Let's import the necessary classes from the **uagents** library, and then using the **Agent** class create a μAgent. Finally, we need to use the print function to get the agent's addresses:

```py copy filename="addresses.py"
from uagents import Agent

alice = Agent(name="alice")

print("uAgent address: ", alice.address)
print("Fetch network address: ", alice.wallet.address())
```

As you can see, the agent will have two types of addresses:

- **uAgent address**: represents the main μAgent identifier. Other μAgents can use this to query the agent's information in the Almanac contract.

- **Fetch address**: provides the agent with the capabilities for interacting with the Fetch ledger such as registering in the Almanac contract.
