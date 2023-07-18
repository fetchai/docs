# μAgents protocols

The μAgents framework supports capturing related message types and handlers in **protocols**. Protocols are used to facilitate communication and interaction between μAgents in the μAgents framework. Any μAgent including the same protocol will be able to communicate with each other.

A **protocol** is built similar to a **μAgents**, but it has no identity and cannot be run. It contains only the message types and handlers that define some components of μAgents functionality.

To better understand what a protocol means and how to build one, let's use a _simple restaurant table booking request_ as an example. We first need to define the type of messages that the handler will receive and send. Here we define **BookTableRequest** which will contain the requested table number and **BookTableResponse** which will inform the user if that table is available.

```py
from uagents import Context, Model, Protocol

class BookTableRequest(Model):
    table_number: int

class BookTableResponse(Model):
    success: bool
```

Now we define the booking protocol as **book_proto** and we define the desired logic to determine if the **BookTableResponse** will be successful or not.

```py
book_proto = Protocol()

@book_proto.on_message(model=BookTableRequest, replies={BookTableResponse})
async def handle_book_request(ctx: Context, sender: str, msg: BookTableRequest):
    if ctx.storage.has(str(msg.table_number)):
        success = False
    else:
        success = True
        ctx.storage.set(str(msg.table_number), sender)

    # send the response
    await ctx.send(sender, BookTableResponse(success=success))
```

We will create a folder named **protocols** and save this file in it as **book.py**. We can then import it from the agent script:

```py
from protocols.book import book_proto
Then, if your agent is called restaurant you can include the protocol in this way:

restaurant.include(book_proto)
```

For a better understanding of these concepts, consider having a look at the [storage](storage.md) and [Exchange protocol](exchange-protocol.md) resources and consider going through the extensive **[How to book a table at a restaurant using uAgents](demos/booking-demo.md)** demonstration in the demos section of our documentation.
