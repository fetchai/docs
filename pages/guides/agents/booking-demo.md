# How to book a table at a restaurant using uAgents

In this demo, we want to show how to set up the code to create a restaurant booking service with two μAgents: a **restaurant** with tables available, and a **user** requesting table availability.

We also want to define 2 specific **protocols**, one for table querying (i.e., **Table querying protocol**) and one for table booking (i.e., **Table booking protocol**), to be called from a main script we will create at the end of this demonstration. 

1. Navigate towards the directory you created for your project. 
2. In here, we need to create a folder for this task: `mkdir booking_demo`.
3. Inside this folder, create a **main.py** script, and another folder for your protocols: `touch main.py`, `mkdir protocols`.

We are ready to write the code for our 2 protocols and main scripts.

## Protocols
### Table querying protocol

Let's start by defining the protocol for querying availability of tables at the restaurant: 

1. Navigate towards the protocols folder: `cd protocols`
2. Create a .py script named, **query.py**: `touch query.py`
3. In the text editor application, define the **table querying protocol**. 
4. Import necessary classes and define the **message data models**:

    ```py
   from typing import List

   from uagents import Context, Model, Protocol

   class TableStatus(Model):
       seats: int
       time_start: int
       time_end: int

   class QueryTableRequest(Model):
       guests: int
       time_start: int
       duration: int

   class QueryTableResponse(Model):
       tables: List[int]

   class GetTotalQueries(Model):
       pass

   class TotalQueries(Model):
       total_queries: int
    ```

   - **TableStatus**: this represents the status of a table and includes the attributes number of seats, start time, and end time. 
   - **QueryTableRequest**: this is used for querying table availability. It includes information about the number of guests, start time, and duration of the table request. 
   - **QueryTableResponse**: this contains the response to the query table availability. It includes a list of table numbers that are available based on query parameters.
   - **GetTotalQueries**: this is used to request the total number of queries made to the system.
   - **TotalQueries**: this contains the response to the total queries request, including the count of total queries made to the system. 

5. Create an instance of the **Protocol** class named **query_proto**.

    ```py
    query_proto = Protocol()
    ```

6. Define the message handlers for the **query_proto** protocol.

    ```py
   @query_proto.on_message(model=QueryTableRequest, replies=QueryTableResponse)
   async def handle_query_request(ctx: Context, sender: str, msg: QueryTableRequest):
       tables = {
           int(num): TableStatus(**status)
           for (
               num,
               status,
           ) in ctx.storage._data.items()  # pylint: disable=protected-access
           if isinstance(num, int)
       }

       available_tables = []
       for number, status in tables.items():
           if (
               status.seats >= msg.guests
               and status.time_start <= msg.time_start
               and status.time_end >= msg.time_start + msg.duration
           ):
               available_tables.append(int(number))

       ctx.logger.info(f"Query: {msg}. Available tables: {available_tables}.")

       await ctx.send(sender, QueryTableResponse(tables=available_tables))

       total_queries = int(ctx.storage.get("total_queries") or 0)
       ctx.storage.set("total_queries", total_queries + 1)


   @query_proto.on_query(model=GetTotalQueries, replies=TotalQueries)
   async def handle_get_total_queries(ctx: Context, sender: str, _msg: GetTotalQueries):
       total_queries = int(ctx.storage.get("total_queries") or 0)
       await ctx.send(sender, TotalQueries(total_queries=total_queries))
    ```

   - **handle_query_request()**: this message handler function is defined using the **@query_proto.on_message()** decorator. It handles the **QueryTableRequest** messages and replies with a **QueryTableResponse** message. The handler processes the table availability query based on the provided parameters, checks the table statuses stored in the agent's storage, and sends the available table numbers as a response to the querying agent. Additionally, the handler tracks the total number of queries made and increments the count in storage.
   - **handle_get_total_queries()**: this message handler is defined using the **@query_proto.on_query()** decorator. It handles the **GetTotalQueries** query and replies with a **TotalQueries** message containing the total number of queries made to the system. The handler retrieves the total query count from the agent's storage and responds with the count.

7. Save the script.

The overall script should look as follows:

```py
from typing import List

from uagents import Context, Model, Protocol

class TableStatus(Model):
    seats: int
    time_start: int
    time_end: int

class QueryTableRequest(Model):
    guests: int
    time_start: int
    duration: int

class QueryTableResponse(Model):
    tables: List[int]

class GetTotalQueries(Model):
    pass

class TotalQueries(Model):
    total_queries: int

query_proto = Protocol()

@query_proto.on_message(model=QueryTableRequest, replies=QueryTableResponse)
async def handle_query_request(ctx: Context, sender: str, msg: QueryTableRequest):
    tables = {
        int(num): TableStatus(**status)
        for (
            num,
            status,
        ) in ctx.storage._data.items()  # pylint: disable=protected-access
        if isinstance(num, int)
    }

    available_tables = []
    for number, status in tables.items():
        if (
            status.seats >= msg.guests
            and status.time_start <= msg.time_start
            and status.time_end >= msg.time_start + msg.duration
        ):
            available_tables.append(int(number))

    ctx.logger.info(f"Query: {msg}. Available tables: {available_tables}.")

    await ctx.send(sender, QueryTableResponse(tables=available_tables))

    total_queries = int(ctx.storage.get("total_queries") or 0)
    ctx.storage.set("total_queries", total_queries + 1)

@query_proto.on_query(model=GetTotalQueries, replies=TotalQueries)
async def handle_get_total_queries(ctx: Context, sender: str, _msg: GetTotalQueries):
    total_queries = int(ctx.storage.get("total_queries") or 0)
    await ctx.send(sender, TotalQueries(total_queries=total_queries))
```

### Table booking protocol

We can now proceed by writing the booking protocol script for booking the table at the restaurant.

1. Navigate towards the protocols folder: `cd protocols`
2. Create a .py script named, **book.py**: `touch book.py`
3. In the text editor application, define the **table booking protocol**. The protocol consists of two message models: **BookTableRequest** and **BookTableResponse**.

    ```py
   from uagents import Context, Model, Protocol

   from .query import TableStatus

   class BookTableRequest(Model):
       table_number: int
       time_start: int
       duration: int

   class BookTableResponse(Model):
       success: bool
    ```

   - **BookTableRequest**: this represents the request to book a table. It includes attributes: **table_number** to be booked, **time_start** of the booking, and the **duration** of the booking. 
   - **BookTableResponse**: This contains the response to the table booking request. It includes a boolean attribute **success**, indicating whether the booking was successful or not.

4. Create an instance of the **Protocol** class named **book_proto**.

    ```py
    book_proto = Protocol()
    ```

5. Define the message handler.

    ```py
   @book_proto.on_message(model=BookTableRequest, replies=BookTableResponse)
   async def handle_book_request(ctx: Context, sender: str, msg: BookTableRequest):
       tables = {
           int(num): TableStatus(**status)
           for (
               num,
               status,
           ) in ctx.storage._data.items()  # pylint: disable=protected-access
           if isinstance(num, int)
       }
       table = tables[msg.table_number]

       if (
           table.time_start <= msg.time_start
           and table.time_end >= msg.time_start + msg.duration
       ):
           success = True
           table.time_start = msg.time_start + msg.duration
           ctx.storage.set(msg.table_number, table.dict())
       else:
           success = False

       # send the response
       await ctx.send(sender, BookTableResponse(success=success))
    ```

   The **handle_book_request()** handler first retrieves table statuses from the agent's storage and converts them into a dictionary with integer keys (table numbers) and **TableStatus** values. The **TableStatus** class is imported from the **query** module. Next, the handler gets the table associated with the requested **table_number** from the **tables** dictionary. The handler checks if the requested **time_start** falls within the availability period of the table. If the table is available for the requested booking duration, the handler sets **success** to **True**, updates the table's **time_start** to reflect the end of the booking, and saves the updated table information in the agent's storage using **ctx.storage.set()**. If the table is not available for the requested booking, the handler sets **success** to **False**.
   The handler sends a **BookTableResponse** message back to the sender with the **success** status of the booking using await **ctx.send()** method.

6. Save the script.

The overall script should look as follows: 

```py
from uagents import Context, Model, Protocol

from .query import TableStatus

class BookTableRequest(Model):
    table_number: int
    time_start: int
    duration: int

class BookTableResponse(Model):
    success: bool

book_proto = Protocol()

@book_proto.on_message(model=BookTableRequest, replies=BookTableResponse)
async def handle_book_request(ctx: Context, sender: str, msg: BookTableRequest):
    tables = {
        int(num): TableStatus(**status)
        for (
            num,
            status,
        ) in ctx.storage._data.items()  # pylint: disable=protected-access
        if isinstance(num, int)
    }
    table = tables[msg.table_number]

    if (
        table.time_start <= msg.time_start
        and table.time_end >= msg.time_start + msg.duration
    ):
        success = True
        table.time_start = msg.time_start + msg.duration
        ctx.storage.set(msg.table_number, table.dict())
    else:
        success = False

    # send the response
    await ctx.send(sender, BookTableResponse(success=success))
```

## Restaurant agent

1. Create a restaurant.py script in booking_demo folder.
2. Import necessary classes from the uagents library and the two protocols defined above.

    ```py
   from uagents import Agent
   from uagents.setup import fund_agent_if_low

   restaurant = Agent(
       name="restaurant",
       port=8001,
       seed="restaurant secret phrase",
       endpoint=["http://127.0.0.1:8001/submit"],
   )

   fund_agent_if_low(restaurant.wallet.address())
    ```

3. Build the restaurant agent from above protocols and set the table availability information.

   ```py
   from protocols.book import book_proto
   from protocols.query import query_proto, TableStatus

   # build the restaurant agent from stock protocols
   restaurant.include(query_proto)
   restaurant.include(book_proto)

   TABLES = {
       1: TableStatus(seats=2, time_start=16, time_end=22),
       2: TableStatus(seats=4, time_start=19, time_end=21),
       3: TableStatus(seats=4, time_start=17, time_end=19),
   }
   ```

4.  Store the TABLES information in the restaurant agent and run it.

   ```py
   for (number, status) in TABLES.items():
       restaurant._storage.set(number, status.dict())

   if __name__ == "__main__":
       restaurant.run()
   ```

**The restaurant agent is now online and listing for messages**.

The overall script should look as follows:

```py
from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
from protocols.book import book_proto
from protocols.query import query_proto, TableStatus

restaurant = Agent(
    name="restaurant",
    port=8001,
    seed="restaurant secret phrase",
    endpoint=["http://127.0.0.1:8001/submit"],
)

fund_agent_if_low(restaurant.wallet.address())

# build the restaurant agent from stock protocols
restaurant.include(query_proto)
restaurant.include(book_proto)
TABLES = {
    1: TableStatus(seats=2, time_start=16, time_end=22),
    2: TableStatus(seats=4, time_start=19, time_end=21),
    3: TableStatus(seats=4, time_start=17, time_end=19),
}

# set the table availability information in the restaurant protocols
for (number, status) in TABLES.items():
    restaurant._storage.set(number, status.dict())

if __name__ == "__main__":
    restaurant.run()
```

## User agent

1. Create a user.py script in booking_demo folder.
2. Import necessary classes from the uagents library and the two protocols defined above. We also need the restaurant agent's address to be able to communicate with it.

   ```py
   from uagents import Agent, Context
   from uagents.setup import fund_agent_if_low
   from protocols.book import BookTableRequest, BookTableResponse
   from protocols.query import (
       QueryTableRequest,
       QueryTableResponse,
   )

   RESTAURANT_ADDRESS = "agent1qw50wcs4nd723ya9j8mwxglnhs2kzzhh0et0yl34vr75hualsyqvqdzl990"

   user = Agent(
       name="user",
       port=8000,
       seed="user secret phrase",
       endpoint=["http://127.0.0.1:8000/submit"],
   )

   fund_agent_if_low(user.wallet.address())
   ```

3. Create the table query to generate the **QueryTableRequest** using the **restaurant** address. If the request has not been completed before, we send the request to the restaurant agent. Then create an **interval()** function which performs a table query request on a defined period to the restaurant, to query the availability of a table given the **table_query** parameters.

    ```py
   table_query = QueryTableRequest(
       guests=3,
       time_start=19,
       duration=2,
   )

   @user.on_interval(period=3.0, messages=QueryTableRequest)
   async def interval(ctx: Context):
       completed = ctx.storage.get("completed")

       if not completed:
           await ctx.send(RESTAURANT_ADDRESS, table_query)
    ```

4. Define the message handler function for incoming **QueryTableResponse** messages from the **restaurant** agent.

   ```py
   @user.on_message(QueryTableResponse, replies={BookTableRequest})
   async def handle_query_response(ctx: Context, sender: str, msg: QueryTableResponse):
       if len(msg.tables) > 0:
           ctx.logger.info("There is a free table, attempting to book one now")
           table_number = msg.tables[0]
           request = BookTableRequest(
               table_number=table_number,
               time_start=table_query.time_start,
               duration=table_query.duration,
           )
           await ctx.send(sender, request)
       else:
           ctx.logger.info("No free tables - nothing more to do")
           ctx.storage.set("completed", True)
   ```

   This function activates when a message is received back from the **restaurant** agent. **handle_query_response()** will evaluate if there is a table available, and if so, respond with a **BookTableRequest** to complete the reservation.

5. Define a **handle_book_response()** function which will handle messages from the restaurant agent on whether the reservation was successful or unsuccessful.

    ```py
   @user.on_message(BookTableResponse, replies=set())
   async def handle_book_response(ctx: Context, _sender: str, msg: BookTableResponse):
       if msg.success:
           ctx.logger.info("Table reservation was successful")
       else:
           ctx.logger.info("Table reservation was UNSUCCESSFUL")

       ctx.storage.set("completed", True)

   if __name__ == "__main__":
       user.run()
    ```

6. Save the script.

The overall script should look as follows:

```py
from protocols.book import BookTableRequest, BookTableResponse
from protocols.query import (
    QueryTableRequest,
    QueryTableResponse,
)
from uagents import Agent, Context
from uagents.setup import fund_agent_if_low

RESTAURANT_ADDRESS = "agent1qw50wcs4nd723ya9j8mwxglnhs2kzzhh0et0yl34vr75hualsyqvqdzl990"

user = Agent(
    name="user",
    port=8000,
    seed="user secret phrase",
    endpoint=["http://127.0.0.1:8000/submit"],
)

fund_agent_if_low(user.wallet.address())

table_query = QueryTableRequest(
    guests=3,
    time_start=19,
    duration=2,
)
# This on_interval agent function performs a request on a defined period
@user.on_interval(period=3.0, messages=QueryTableRequest)
async def interval(ctx: Context):
    completed = ctx.storage.get("completed")

    if not completed:
        await ctx.send(RESTAURANT_ADDRESS, table_query)

@user.on_message(QueryTableResponse, replies={BookTableRequest})
async def handle_query_response(ctx: Context, sender: str, msg: QueryTableResponse):
    if len(msg.tables) > 0:
        ctx.logger.info("There is a free table, attempting to book one now")
        table_number = msg.tables[0]
        request = BookTableRequest(
            table_number=table_number,
            time_start=table_query.time_start,
            duration=table_query.duration,
        )
        await ctx.send(sender, request)
    else:
        ctx.logger.info("No free tables - nothing more to do")
        ctx.storage.set("completed", True)

@user.on_message(BookTableResponse, replies=set())
async def handle_book_response(ctx: Context, _sender: str, msg: BookTableResponse):
    if msg.success:
        ctx.logger.info("Table reservation was successful")
    else:
        ctx.logger.info("Table reservation was UNSUCCESSFUL")
    ctx.storage.set("completed", True)

if __name__ == "__main__":
    user.run()
```

## Run your script

Run the **restaurant** agent and then the **user** agent from different terminals.

- Terminal 1: `python restaurant.py`
- Terminal 2: `python user.py`
