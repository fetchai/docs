# Create a μAgents

First of all, you need to:

- Satisfy the [system requirements](system-requirements.md).
- Install a text editor (e.g., [PyCharm CE](https://www.jetbrains.com/pycharm/download/) or [VisualStudioCode](https://code.visualstudio.com/download)).

Open your command prompt (for Windows users) or terminal (for MacOS users) and navigate towards the directory created for the project and within which you have installed the Fetch.ai μAgents Framework. At this point, create a Python script within this directory.

``` py
touch name_of_script.py
```

This script will contain all code needed for your μAgents to run correctly. 

To start developing your μAgent, you need to import the necessary classes **Agent** and **Context** from the **uagents** library. 

``` py
from uagents import Agent, Context
```

The **Agent** class represents an autonomous μAgent capable of making decisions, executing behaviors, and interacting with other agents in a decentralized fashion, whereas, the **Context** class provides μAgents with information about their environment and facilitates interactions between μAgents. Combining the **Agent** and **Context** classes provides the environment and communication infrastructure usable to build intelligent μAgents that operate autonomously and participate in decentralized networks.

We proceed with creating an instance of the **Agent** class, **alice**, which represents our μAgent. 

``` py
alice = Agent(name="alice", seed="alice recovery phrase")
```

The μAgent is assigned a **name** and a **seed**. This latter one parameter is optional but needed to set fixed addresses. Otherwise, random addresses will be generated every time you run the agent.

Each μAgent is defined by 2 types of _addresses_:

- **μAgent address**, which is the μAgent's main identifier; 
- **Fetch network address**, which provides the μAgent with the capabilities for interacting with the Fetch ledger.

To check your μAgent's addresses, use the **print()** function:

``` py
print("uAgent address: ", alice.address)
print("Fetch network address: ", alice.wallet.address())
```

Then, you may assign your agent a behavior to be executed. Within the μAgents Framework, _decorators are used to run periodic actions_ (e.g., sending a message periodically), or to run an action based on a specific event happening (e.g., when a message is being received). 

For instance, **alice** agent could send a message to itself every 2 seconds saying hello.

``` py
@alice.on_interval(period=2.0)
async def say_hello(ctx: Context):
    ctx.logger.info(f'hello, my name is {ctx.name}')

if __name__ == "__main__":
    alice.run()
```

The μAgent runs a **say_hello()** function to send a message periodically every **2.0** seconds, to log a message with the name provided in the **ctx** object, **alice**. The agent then uses the **ctx.logger.info()** method to print the content of such a message on your terminal, that is: **hello my name is alice**. 

You then need to save your .py script on the text editor of your choice and go back to the terminal or command prompt. 

In here, activate the virtual environment, 

``` py
poetry shell
```

and run the script,

``` py
python name_of_script.py
```

Congratulations, you successfully created your first μAgent! 