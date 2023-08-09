# μAgents Storage 

μAgents storage is an important concept to understand how μAgents work. You can use the **Context** object to modify storage information related to your μAgent. While writing the code for your agent, you can add within an event handler, different methods retrieved using `ctx` (i.e., the agent's `Context` object) to retrieve and edit storage values.

For instance, you could use the **set** method of the **Context** object to set the μAgent's local storage by simply running:

```py copy
ctx.storage.set("key", "value")
```

This will save the information in a **JSON file**. This information can be retrieved at any time using the **get** method of the **Context** object:

```py copy
 ctx.storage.get("key")
```

For a practical understanding of the concept of storage, have a look at the **Using μAgents storage function** [↗️](/docs/guides/agents/storage-function.md) guide in the μAgents guides section for a step-by-step example showing how to retrieve and set storage values.

The **how to book a table at a restaurant using uAgents** [↗️](/docs/guides/agents/booking-demo.md) guide in the μAgents guides section, instead, shows a more complex and real-world demonstration making use of the μAgent's storage to store a table information in a restaurant. 
