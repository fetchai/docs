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

For a practical understanding of the concept of storage, have a look at the [Storage tutorial](storage.md) in the μAgents Tutorials section for a simplified step-by-step example showing how to retrieve and set storage values.

[Restaurant Booking Table](booking-demo.md) in the μAgents Demos for a demonstration making use of the μAgent's storage to store a table information in a restaurant. 
