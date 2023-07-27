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

For a practical understanding of the concept of storage, have a look at the _Storage_ [↗️](/docs/guides/agents/storage-function.md) guidein the guides section for a simplified step-by-step example showing how to retrieve and set storage values.

The How to book a table at a restaurant using μAgents [↗️](/docs/guides/agents/booking-demo.md) guide in the guides section, instead, shows a more complex and real-world demonstration making use of the μAgent's storage to store a table information in a restaurant. 
