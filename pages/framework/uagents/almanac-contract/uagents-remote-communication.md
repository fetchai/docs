# Remote Communication between μAgents

The Almanac contract allows μAgents to interact remotely from different locations across the internet. All you need to know is the recipient agent's address to query its information.

In this example, we will simulate a remote communication between μAgents by running two agents, alice and bob, on different ports and terminals on the same device. Let's start by creating two agents separately. To do so, let's first create two different .py scripts for this task:

> touch remote_agent_bob.py
> touch remote_agent_alice.py

## Alice

On the text editor application of your choice, first open _remote_agent_alice.py_. We will start by defining **alice** and the recipient address (**bob**'s agent address in this example).

```py
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context, Model

class Message(Model):
    message: str

RECIPIENT_ADDRESS = "agent1q2kxet3vh0scsf0sm7y2erzz33cve6tv5uk63x64upw5g68kr0chkv7hw50"

alice = Agent( 
    name="alice",
    port=8000,
    seed="alice secret phrase",
    endpoint=["http://127.0.0.1:8000/submit"],
)

fund_agent_if_low(alice.wallet.address())
```

We use the **uagents** package to import the classes **Agent**, **Context**, and **Model**.

We start by defining the **Message** class which is a model for the message that **alice** will send to **bob** agent. It has a single attribute **message** of type string (**str**).

We then proceed by defining the **RECIPIENT_ADDRESS**, which is the destination of the message that **alice** will send.

Then, we create a μAgent named **alice** and define our its endpoints as a list of strings. **alice** is configured with: 

- **name**: it is the name of the agent.
- **port**: it specifies which port the agent should be uses for communication
- **seed**: it is a secret phrase used to generate the agent's private key.	

The **fund_agent_if_low()** checks if the balance of the agent's wallet is below a certain threshold, and if so, sends a transaction to fund the wallet with a specified amount of cryptocurrency. In this case, it checks if the balance of **alice**'s wallet is low and funds it if necessary. Importantly, make sure to add a seed to your agent, so you don't have to fund different addresses each time you run your agent.

We can now define alice's functions and behaviour. We want to define an interval task for this agent, so for it to send a message to the recipient address every 2 seconds:

```py
@alice.on_interval(period=2.0)
async def send_message(ctx: Context):
    await ctx.send(RECIPIENT_ADDRESS, Message(message="hello there bob")
```

We use the **@alice.on_interval(period=2.0)** decorator to schedule the **send_message()** coroutine function to run every 2 seconds. The **send_message()** function accepts a **Context** object, **ctx**, as an argument, which is used to provide context and configuration information to the function. Inside the **send_message()** function, there is an asynchronous call **await ctx.send(RECIPIENT_ADDRESS, Message(message="hello there bob"))**. 

This call sends a message with the content, "**hello there bob**", to the recipient specified by the **RECIPIENT_ADDRESS** variable.

We then need to define a message handler function for **alice** to handle or upcoming messages from **bob**.

```py
@alice.on_message(model=Message)
async def message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

if __name__ == "__main__":
    alice.run()
```

We now use the **@alice.on_message(model=Message)** decorator to register the **message_handler()** coroutine function as a handler for incoming messages of type **Message** from bob.

The **message_handler()** function accepts three arguments:

- **ctx**: a Context object that provides context and configuration information to the function.
- **sender**: a string representing the sender of the message.
- **msg**: a **Message** object representing the incoming message.

Inside the **message_handler()** function, we call the **ctx.logger.info()** method to log information about the received message, including the sender (**bob**) and message content.

The overall script for alice should be:

```py
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context, Model

class Message(Model):
    message: str

RECIPIENT_ADDRESS = "agent1q2kxet3vh0scsf0sm7y2erzz33cve6tv5uk63x64upw5g68kr0chkv7hw50"

alice = Agent( 
    name="alice",
    port=8000,
    seed="alice secret phrase",
    endpoint=["http://127.0.0.1:8000/submit"],
)

fund_agent_if_low(alice.wallet.address())

@alice.on_interval(period=2.0)
async def send_message(ctx: Context):
    await ctx.send(RECIPIENT_ADDRESS, Message(message="hello there bob")

@alice.on_message(model=Message)
async def message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

if __name__ == "__main__":
    alice.run()
```

## Bob

Now consider **remote_agent_bob.py** script. Like before, we need to define a **Message** class for messages and create a μAgent named **bob**, configured with a **name**, **port**, and **seed**. We also need to register **bob** in the Almanac by first ensuring it has enough funds in its wallet to do so, thus we run the **fund_agent_if_low()** function. This function takes an address as an argument, which is obtained from **bob.wallet.address()**.

```py
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context, Model

class Message(Model):
    message: str

bob = Agent(
    name="bob",
    port=8001,
    seed="bob secret phrase",
    endpoint=["http://127.0.0.1:8001/submit"],
)

fund_agent_if_low(bob.wallet.address())
```

We then need to define just a message handler function to print out **alice**'s messages and respond to it afterwards.

```py
@bob.on_message(model=Message)
async def message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

    await ctx.send(sender, Message(message="hello there alice"))

if __name__ == "__main__":
    bob.run()
```

The **message_handler()** function is a coroutine function that is executed when a message is received by the agent with the **bob.on_message()** decorator. This function logs the received message using the agent's logger and sends a response message back to the original sender with the **ctx.send()** method. The response message contains the **Message** data model with a "**hello there alice**" message.

The overall script for bob should be:

```py
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context, Model

class Message(Model):
    message: str

bob = Agent(
    name="bob",
    port=8001,
    seed="bob secret phrase",
    endpoint=["http://127.0.0.1:8001/submit"],
)

fund_agent_if_low(bob.wallet.address())

@bob.on_message(model=Message)
async def message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

    await ctx.send(sender, Message(message="hello there alice"))

if __name__ == "__main__":
    bob.run()
```

## Run the agents

Now, we are ready to run our scripts. First run bob and then alice from different terminals. They will register automatically in the Almanac contract using their funds. The received messages will print out in each terminal. 

> python remote_agent_bob.py

> python remote_agent_alice.py
