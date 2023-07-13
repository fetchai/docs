# μAgents Storage 

You can store information using the μAgent's local storage by simply running:

```py
ctx.storage.set("key", "value")
```

within a handler, where `ctx` is the agent's `Context` object.

This will save the information in a JSON file, which you can retrieve at any time using:

```python
 ctx.storage.get("key")
```

For a practical understanding of the concept of storage, have a look at the [Restaurant Booking Table Demo](booking-table-demo.md) for a demonstration making use of the μAgent's storage to store a table information, otherwise have a look at the example below.

### Example

In this example, we illustrate how storage functions are called and how to use them. 

We want to create a μAgent which gets a value from the storage (starting from 0) every second. Then prints it, and puts the new value back into the storage but increased by 1 unit.

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

We import the necessary classes from the **uagents** library and create a μAgent named **alice** which logs a message every second using the **on_interval** decorator. The **on_interval()** function takes a **Context** object as a parameter: the **Context** object contains a storage attribute, which is used to store and retrieve data between method calls. 

In our example, the **on_interval()** function retrieves the current count from the storage attribute using the **ctx.storage.get()** method. It prints the current **count** value, and then increments the count by 1, and stores the updated count back to the storage attribute using the **ctx.storage.set()** method. The current count is then logged using the **ctx.logger.info()** method.


