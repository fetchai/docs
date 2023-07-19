# Create a μAgent Printing Name and Address

1. Create a Python script: `my_first_agent.py`
2. Import the necessary classes **Agent** and **Context** from the **uagents** library. 

    ``` py
    from uagents import Agent, Context
    ```

3. Create an instance of the **Agent** class, **alice**.

    ``` py
    alice = Agent(name="alice", seed="alice recovery phrase")
    ```

4. Assign the μAgent a behavior to be executed. For instance, **alice** agent could send a message when it is being run (on startup), saying hello and printing its address.

    ``` py
   @alice.on_event("startup")
   async def introduce_agent(ctx: Context):
       ctx.logger.info(f"Hello, I'm agent {ctx.name} and my address is {ctx.address}."

    if __name__ == "__main__":
        alice.run()
    ```

5. Save the script.

## Run the script

On your terminal, make sure to be in the right directory for your project and activate the virtual environment.
Run the script: `my_first_agent.py`

**Congratulations, you have successfully created your first μAgent!** 
