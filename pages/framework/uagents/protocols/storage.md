# Storage

You can store information using the μAgent's local storage by simply running:

```py
ctx.storage.set("key", "value")
```

within a handler, where `ctx` is the agent's `Context` object.

This will save the information in a JSON file, which you can retrieve at any time using:

```python
 ctx.storage.get("key")
```

For a better understanding of the concept of storage, have a look at the [Restaurant Booking Table Demo](booking-table-demo.md) for a demonstration makeing use of the μAgent's storage to store a table information.
