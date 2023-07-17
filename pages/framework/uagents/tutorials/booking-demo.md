# Restaurant Booking Table Demo

In this demo, we will show how to set up the code for a μAgent to query the state of a table at a restaurant and possibly book it if available, but defining different **protocols**. 

We want to define 2 specific protocols, one for table querying (**Table query protocol**) and one for table booking (**Table booking protocol**), to be called from a main script we will create at the end of this demonstration. 

1. Navigate towards the directory you created for your project. 
2. In here, we need to create a folder for this task: `mkdir booking_demo`.
3. Inside this folder, create a main.py script, and another folder for your protocols: `touch main.py`, `mkdir protocols`.

We are ready to write the code for our 2 protocols and main script.

## Protocols
### Table query protocol

Let's start by defining the protocol for querying availability of tables at the restaurant: 

1. Navigate towards the protocols folder: `cd protocols`
2. Create a .py script named, **query.py**: `touch query.py`
3. In the text editor application, define the **table query protocol**. The protocol consists of two message models: **QueryTableRequest** and **QueryTableResponse**, and an enumeration **TableStatus**.

    ```py
    from enum import Enum

    from uagents import Context, Model, Protocol

    class TableStatus(str, Enum):
        RESERVED = "reserved"
        FREE = "free"

    class QueryTableRequest(Model):
        table_number: int

    class QueryTableResponse(Model):
        status: TableStatus

    query_proto = Protocol()
    ```

    We define the enumeration **TableStatus** using the **Enum** class from the **enum** module, which contains two members: **RESERVED** and **FREE**. 

    We then want to define two data models using the **Model** class from the **uagents** library: **QueryTableRequest**, which has a single attribute **table_number** of type **integer**, representing the table number to query, and **QueryTableResponse**, which has a single attribute status of type **TableStatus**.

    We then create an instance of the **Protocol** class from the **uagents** module named **query_proto**.

    ```py
    query_proto = Protocol()
    ```
 4. We then define a message handler function to handle incoming messages.

    ```py
    @query_proto.on_message(model=QueryTableRequest, replies={QueryTableResponse})
    async def handle_query_request(ctx: Context, sender: str, msg: QueryTableRequest):
        if ctx.storage.has(str(msg.table_number)):
            status = TableStatus.RESERVED
        else:
            status = TableStatus.FREE
        ctx.logger.info(f"Table {msg.table_number} query. Status: {status}")

        await ctx.send(sender, QueryTableResponse(status=status))
    ```

    The decorator registers a handler function for **QueryTableRequest** messages received. The function checks if the requested table is already booked by checking the storage of the context object using the **ctx.storage.has()** method. If the table has been already booked, the response status attribute is set to **TableStatus.RESERVED**. Otherwise, the response status attribute is set to **TableStatus.FREE**.
    The function also logs the query and the status of the queried table using the **ctx.logger.info()**. Finally, the response (**QueryTableResponse**) is sent back to the sender using the **ctx.send()** method, with the status attribute set to the appropriate value.

5. Save the script.

### Table book protocol

We can now proceed by writing the booking protocol script for booking the table at the restaurant.

1. Navigate towards the protocols folder: `cd protocols`
2. Create a .py script named, **book.py**: `touch book.py`
3. In the text editor application, define the **table book protocol**. The protocol consists of two message models: **BookTableRequest** and **BookTableResponse**.

    ```py
    from uagents import Context, Model, Protocol

    class BookTableRequest(Model):
        table_number: int

    class BookTableResponse(Model):
        success: bool

    book_proto = Protocol()
    ```
    We define two data models using the **Model** class: **BookTableRequest**, which has a single attribute **table_number** of type **int**, and **BookTableResponse**, which has a single attribute **success** of type **bool**, indicating whether the table was successfully booked or not.

4. Then, we define the _booking protocol_ as **book_proto**, as well as define the desired logic to determine if the **BookTableResponse** will be successful or not.

    ```py
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

    The decorator is used to register a handler function for **BookTableRequest** messages. The function checks if the requested table is already booked by checking the storage of the context object using the **ctx.storage.has()** method. If the table has been already booked, the response **success** attribute is set to **False**. Otherwise, the response **success** attribute is set to **True** and the **sender** identifier is stored in the context storage using the **ctx.storage.set()** method.

    Finally, the response is sent back to the sender using the **ctx.send()** method, which takes ad parameters the sender identifier and the BookTableResponse object with the success attribute set to the appropriate value.

5. Save the script.

## Main script

We are now able to focus on writing the script for this example. 

1. In the text editor, enter the main.py script we initially created.
2. Import necessary classes from the two protocols we defined above, to make them directly callable and usable from our main script file.

    ```py
    from protocols.book import BookTableRequest, BookTableResponse, book_proto
    from protocols.query import (
        QueryTableRequest,
        QueryTableResponse,
        TableStatus,
        query_proto,
    )

    from uagents import Agent, Bureau, Context
    ```

    The **BookTableRequest** and **BookTableResponse** models and the **book_proto** protocol are used to request and confirm the booking of a table, whereas the **QueryTableRequest**, **QueryTableResponse**, **TableStatus**, and **query_proto** models and protocol are used to request and retrieve information about the status of a table.

    We also import the necessary classes from the **uagents** library.

3. Create two μAgents instances of the **Agent** class: **customer** and **restaurant**. The **restaurant** agent includes both the **query_proto** and **book_proto** protocols, which means it is capable of handling requests and responses related to querying table status and booking tables. The customer agent does not include any protocols.

    ```py
    restaurant = Agent(name="Restaurant")
    restaurant.include(query_proto)
    restaurant.include(book_proto)

    customer = Agent(name="Customer")
    ```
4. Define functions and behaviors.

    ```py
    @customer.on_interval(period=3.0, messages=QueryTableRequest)
    async def interval(ctx: Context):
        started = ctx.storage.get("started")

        if not started:
            await ctx.send(restaurant.address, QueryTableRequest(table_number=42))

        ctx.storage.set("started", True)
    ```

    This decorator sets up an interval in which the **customer** agent sends a **QueryTableRequest** message to the **restaurant** agent's address every **3.0** seconds. The messages parameter is set to send **QueryTableRequest** messages. The function first checks whether a **started** value is present in the storage object, through the **ctx.storage.get()** method. If it is not, the function sends a **QueryTableRequest** message to the restaurant with the table number specified as **42**. After sending the initial **QueryTableRequest** message, the function sets the **started** value to **True** in the storage object. This ensures that the function will not send duplicate **QueryTableRequest** messages on subsequent intervals.

    ```py
    @customer.on_message(QueryTableResponse, replies={BookTableRequest})
    async def handle_query_response(ctx: Context, sender: str, msg: QueryTableResponse):

        if msg.status == TableStatus.FREE:
            ctx.logger.info("Table is free, attempting to book it now")
            await ctx.send(sender, BookTableRequest(table_number=42))

        else:
            ctx.logger.info("Table is not free - nothing more to do")
    ```

    This decorator defines a handler function triggered whenever a **QueryTableResponse** message is received. The function checks the status of the table in the message, and if it is free, it attempts to book the table by sending a **BookTableRequest** message to the restaurant with the table number specified. If the table is not free, it logs a message indicating that there is nothing more to do.

    ```py
    @customer.on_message(BookTableResponse, replies=set())
    async def handle_book_response(ctx: Context, _sender: str, msg: BookTableResponse):

        if msg.success:
            ctx.logger.info("Table reservation was successful")

        else:
            ctx.logger.info("Table reservation was UNSUCCESSFUL")
    ```

    This message handler function is triggered whenever the customer receives a **BookTableResponse** message. The function checks the **success** field in the message, and if it is **True**, it logs a message indicating that the table reservation was successful. If it is **False**, it logs a message indicating that the reservation was unsuccessful.

5. Add both μAgents to the Bureau.

    ```py
    bureau = Bureau()
    bureau.add(customer)
    bureau.add(restaurant)

    if __name__ == "__main__":
        bureau.run()
    ```

6. Save the script.

The overall script should look as follows:

```py

```

## Run your script

On your terminal, make sure you are in the right directory and that you activated your virtual environment. 
Run the _main.py_ script: `python main.py`.