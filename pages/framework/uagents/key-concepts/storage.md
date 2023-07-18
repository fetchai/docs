
# Storage

You can store information using the agent's local storage by simply running:
```python
ctx.storage.set("key", "value")
```
within a handler, where `ctx` is the agent's `Context` object.

This will save the information in a JSON file, you can retreive it a any time using:

```python
 ctx.storage.get("key")
```
