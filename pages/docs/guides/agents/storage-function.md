# Using μAgents storage function

In this tutorial, we illustrate how storage functions are called and how to use them. 

We want to create a μAgent which gets a value from the storage (starting from 0) every second. Then prints it, and puts the new value back into the storage but increased by 1 unit.

1. Create a .py script: `touch storage.py`.
2. Open the script in your text editor of choice and import the necessary classes from the **uagents** library.
3. Create a μAgent named **alice** which logs a message every second using the **on_interval()** decorator, indicating the current count. The **on_interval()** function takes a **Context** object as a parameter: the **Context** object contains a storage attribute, which is used to store and retrieve data between method calls. 

    ```py
    from uagents import Agent, Context

    alice = Agent(name="alice", seed="alice recovery phrase")

    @alice.on_interval(period=1.0)
    async def on_interval(ctx: Context):

        current_count = ctx.storage.get("count") or 0

        ctx.logger.info(f"My count is: {current_count}")

        ctx.storage.set("count", current_count + 1)

    if __name__ == "__main__":
        alice.run()
    ```

    Here, the **on_interval()** function retrieves the current count from the storage attribute using the **ctx.storage.get()** method. It prints the **current_count** value, and then increments it by 1, and stores the updated count back to the storage attribute using the **ctx.storage.set()** method. The current count is then logged using the **ctx.logger.info()** method.

4. Save the script.

## Run the script

On your terminal, make sure you activated the virtual environment.

Run the script: `python storage.py`