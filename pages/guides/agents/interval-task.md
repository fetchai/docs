# Creating an interval task
## Introduction

μAgents can perform an _interval task_ to periodically perform actions with a specified time interval. An interval task is achieved thanks to an **on_interval** decorator which periodically repeats a given function for the agent. For instance, an agent could send a message every 2 seconds to another agent.

**Let's get started and create our first interval task!**

## Walk-through 

1. First of all, we would need to create a Python script for this task, and name it: `touch interval-task.py`
2. Let's then import the necessary classes from **uagents** library, **Agent** and **Context**, and create our μAgent:

    ```py copy
    from uagents import Agent, Context

    alice = Agent(name="alice", seed="alice recovery phrase")
    ```

3. We can now define our μAgent's behavior:

    ```py copy
    @alice.on_interval(period=2.0)
    async def say_hello(ctx: Context):
        ctx.logger.info(f'hello, my name is {ctx.name}')
   
    if __name__ == "__main__":
        alice.run()
    ```

   We can use the **on_interval** decorator to repeat a task in a specified time period. In this case, we will just define a **say_hello** function to send a message every 2 seconds, saying hello and printing the name of the agent retrieved using **ctx.name** method. The output will be printed out using the **ctx.logger.info** method.

4. Save the script.

The overall script should look as follows: 

```py copy filename="interval-task.py"
from uagents import Agent, Context

alice = Agent(name="alice", seed="alice recovery phrase")

@alice.on_interval(period=2.0)
async def say_hello(ctx: Context):
    ctx.logger.info(f'hello, my name is {ctx.name}')
    
if __name__ == "__main__":
    alice.run()
```

## Run the script

On your terminal, make sure to have activated the virtual environment correctly.

Run the script: `python interval-task.py`

The output should be as follows:

```
hello, my name is alice
hello, my name is alice
hello, my name is alice
```
