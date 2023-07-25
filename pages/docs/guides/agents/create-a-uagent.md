# Create the agent

You can create your first μAgent by building a Python script with the following steps:

1. Create a script for this task: `touch agent.py`
2. Import necessary classes from the **uagents** library and create a μAgent instance of the class **Agent**.

    ```py
    from uagents import Agent, Context
    
    alice = Agent(name="alice", seed="alice recovery phrase")
    ```

    It is optional but useful to include a `seed` parameter when creating an agent to set fixed [addresses](/docs/guides/agents/getting-uagent-address.md). Otherwise, random addresses will be generated every time you run the agent.

3. Define a **say_hello()** function for alice to print a message periodically saying **"hello, my name is alice"**.

    ```py
    @alice.on_interval(period=2.0)
    async def say_hello(ctx: Context):
        ctx.logger.info(f'hello, my name is {ctx.name}')
   
    if __name__ == "__main__":
        alice.run()
    ```

    The **on_interval()** decorator defines a periodic behavior for this agent. In this case, the agent will execute the **say_hello()** function every 2 seconds. The **Context** object is a collection of data and functions related to the agent. In this case, we just use the agent's name. The agent executes the function and uses the **ctx.logger.info()** method to print the message.
    
4. Save the script

```py
from uagents import Agent, Context

alice = Agent(name="alice", seed="alice recovery phrase")

@alice.on_interval(period=2.0)
async def say_hello(ctx: Context):
    ctx.logger.info(f'hello, my name is {ctx.name}')

if __name__ == "__main__":
    alice.run()
```

## Run your agent

Make sure to have activated your virtual environment correctly. 

Run the script: `python agent.py`

**Congratulations, you have just created your first μAgent!**
