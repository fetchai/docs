# μAgents Remote Communication

Remote μAgents communication is achieved by registering the μAgents into the Almanac contract [↗](/docs/references/contracts/uagents-almanac/almanac-overview.md)️ and then querying it to retrieve an HTTP endpoint from the recipient μAgent. Registration in the Almanac requires paying a small fee, so make sure to have enough funds to allow for this.

Whenever a μAgent registers in the Almanac, it must specify the service endpoints [↗](/docs/references/contracts/uagents-almanac/endpoints.md)️  alongside a weight parameter for each endpoint provided. Agents trying to communicate with your μAgent, will choose the service endpoint using a weighted random selection.

Here, we show you how to create two μAgents and make them remotely communicate using the Almanac Contract.

## Walk-through example

The first step is to create two different Python scripts for this task, each one representing a remote μAgent: 

   Bob: `touch remote_agents_bob.py`
   Alice: `touch remote_agents_alice.py`

Let's start by defining the script for alice.

## Alice

1. In **remote_agents_alice.py** script, we would need to import the necessary classes from the **uagents** library: **Agent**, **Context**, and **Model**. Then, we need to define the message structure for messages to be exchanged between, as well as the **RECIPIENT_ADDRESS**. This is the address to which alice will send messages.

    ```py copy
    from uagents.setup import fund_agent_if_low
    from uagents import Agent, Context, Model
   
    class Message(Model):
        message: str
   
    RECIPIENT_ADDRESS = "agent1q2kxet3vh0scsf0sm7y2erzz33cve6tv5uk63x64upw5g68kr0chkv7hw50"
    ```

2. Let's now create our μAgent, **alice**, by providing **name**, **seed**, **port**, and **endpoint**. Also, make sure it has enough funds to register in the Almanac contract.

    ```py copy
    RECIPIENT_ADDRESS = "agent1q2kxet3vh0scsf0sm7y2erzz33cve6tv5uk63x64upw5g68kr0chkv7hw50"

    alice = Agent( 
        name="alice",
        port=8000,
        seed="alice secret phrase",
        endpoint=["http://127.0.0.1:8000/submit"],
    )

    fund_agent_if_low(alice.wallet.address())
    ```

   On the Fetch.ai testnet, you can use the **fund_agent_if_low** function. This one checks if the balance of the μAgent’s wallet is below a certain threshold, and if so, sends a transaction to fund the wallet with a specified amount of cryptocurrency. In this case, it checks if the balance of **alice**'s wallet is low and funds it if necessary.

3. We are ready to define **alice**'s behaviors. Let's start with a function for **alice** to send messages.

    ```py copy
    @alice.on_interval(period=2.0)
    async def send_message(ctx: Context):
        await ctx.send(RECIPIENT_ADDRESS, Message(message="hello there bob")
    ```

   Here, the **on_interval** decorator schedules the send_message coroutine function to be run every 2 seconds. Inside the function, there is an asynchronous call indicated by the **ctx.send** method. This call sends a message with the content **"hello there bob"** to the **RECIPIENT_ADDRESS**.

4. We then need to define a function for **alice** to handle incoming messages from other agents.

    ```py copy
    @alice.on_message(model=Message)
    async def message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")

    if __name__ == "__main__":
        alice.run()
    ```

   Here, we have used the **on_message** decorator to register the **message_handler** coroutine function as a handler for incoming messages of type Message. The **message_handler** function takes three arguments: **ctx**, **sender**, and **msg**. Inside this function, we call the **ctx.logger.info** method to log information about the received message, including the sender and message content.

5. We can now save the script.

The overall script for **alice** agent should be as follows: 

```py copy filename="remote_agents_alice.py"
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
    await ctx.send(RECIPIENT_ADDRESS, Message(message="hello there bob"))

@alice.on_message(model=Message)
async def message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

if __name__ == "__main__":
    alice.run()
```

We can now proceed by writing the script for agent bob.

## Bob

1. In **remote_agents_bob.py** script, import the necessary classes from the **uagents** library: **Agent**, **Context**, and **Model**. Then, define the message structure for messages to be exchanged between the μAgents using the **Model** class, as well as our second μAgent, **bob**, by providing **name**, **seed**, **port**, and **endpoint**. make sure it has enough funds to register in the Almanac contract.

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

2. Let's now define a function for **bob** to handle incoming messages and answering back to the sender.

    ```py
    @bob.on_message(model=Message)
    async def message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")

        await ctx.send(sender, Message(message="hello there alice"))

    if __name__ == "__main__":
        bob.run()
    ```

   Here, we have defined an asynchronous message_handler function for bob to handle incoming messages from other μAgents. The function is decorated with on_message, and it is triggered whenever a message of type Message is received by bob.
   
   When a message is received, the handler function logs the sender's address and the content of the message. It then sends a response back to the sender using the ctx.sen with a new message. The response message contains the Message data model with a "hello there alice" message.

3. Save the script.

The overall script for **bob** should be:

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

In different terminal windows, first run bob and then alice from different terminals. They will register automatically in the Almanac contract using their funds. The received messages will print out in each terminal.

- Bob: `python remote_agent_bob.py`
- Alice: `python remote_agent_alice.py`
