# Creating an interval task

μAgents can use interval tasks to periodically perform actions with a specified time interval, for example, sending a message every 2 seconds.

1. First, we need to navigate towards a directory created for our projects
2. We then need to create a script for this task, and name it: `touch interval-task.py`
3. Let's then import the necessary classes from **uagents** library and create our μAgent:

    ```py copy
    from uagents import Agent, Context

    alice = Agent(name="alice", seed="alice recovery phrase")
    ```

4. We can now define our μAgent's behavior:

   ```py copy
   @alice.on_interval(period=2.0)
   async def say_hello(ctx: Context):
       ctx.logger.info(f'hello, my name is {ctx.name}')
   if __name__ == "__main__":
    alice.run()
   ```

   We can use the **on_interval** decorator to repeat a task in a specified period. In this case, we will just define a **say_hello** function that will print out **"hello, my name is alice"** every 2 seconds.

5. Save the script.

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

On your terminal activate the virtual environment.

Run the script: `touch interval-task.py`
