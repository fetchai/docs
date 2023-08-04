# Printing name and address 🤖📫

In this guide we aim at showing how to create a μAgent being able to say hello and printing its name and address.

## Walk-through

1. First of all, you need to create a Python script and name it: 

   `touch my_agent.py`

2. We then need to import the necessary classes **Agent** and **Context** from the **uagents** library, and then create an instance of the **Agent** class, **alice**:

    ```py copy
    from uagents import Agent, Context
     
    alice = Agent(name="alice", seed="alice recovery phrase")
    ```

3. We would then need to assign the μAgent the behavior to be executed. In this case, **alice** could send a message when it is being run (**on startup**), saying hello and printing its name and address:

    ```py copy 
    @alice.on_event("startup")
    async def introduce_agent(ctx: Context):
        ctx.logger.info(f"Hello, I'm agent {ctx.name} and my address is {ctx.address}."
     
     if __name__ == "__main__":
         alice.run()
    ```

4. Save the script.

The overall script should look as follows:

```py copy filename="my_agent.py"
from uagents import Agent, Context
 
alice = Agent(name="alice", seed="alice recovery phrase")
 
@alice.on_event("startup")
async def introduce_agent(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {ctx.name} and my address is {ctx.address}."
 
if __name__ == "__main__":
    alice.run()
```

## Run the script

On your terminal, make sure to have activated the virtual environment.

Run the script: `my_agent.py`
