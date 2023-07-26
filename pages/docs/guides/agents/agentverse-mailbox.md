# How to use the AgentVerse Mailbox Service

In this tutorial, we show how to enable remote communications between μAgents through the Agentverse Mailbox Service. 
For information on this, visit the dedicated section in our [references section](/docs/references/contracts/uagents-almanac/register-in-the-agentverse-mailbox.md)

## Alice 

1. Create a script for **alice**: `touch alice.py`
2. Import the necessary classes from the **uagents** and **uagents.setup**, and define the **Message** class for messages to be exchanged between our μAgents.

    ```py
    from uagents import Agent, Context, Model
    from uagents.setup import fund_agent_if_low

    class Message(Model):
        message: str
    ```

3. Generate a secure **seed phrase** (e.g. https://pypi.org/project/mnemonic/)

    ```py
    SEED_PHRASE = "put_your_seed_phrase_here"
    ```

4. Copy the address showed below.

    ```py
    print(f"Your agent's address is: {Agent(seed=SEED_PHRASE).address}")
    ```

5. Sign up at [Agentverse](https://agentverse.ai) to get an **API key** and register your μAgent.

    ```py
    API_KEY = "put_your_API_key_here"

    alice = Agent(
        name="alice",
        seed=SEED_PHRASE,
        mailbox=f"{API_KEY}@wss://agentverse.ai",
    )

    fund_agent_if_low(alice.wallet.address())
    ```

6.  Define a message handler for alice.

    ```py
    @alice.on_message(model=Message, replies={Message})
    async def handle_message(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")

        # send the response
        ctx.logger.info("Sending message to bob")
        await ctx.send(sender, Message(message="hello there bob"))


    if __name__ == "__main__":
        alice.run()
    ```
    We defined a **handle_message()** coroutine function that serves as the message handler for the agent. It is triggered whenever the agent receives a message of type **Message**. The function logs the received message and its sender using the **ctx.logger.info()** method. It then sends a response message back to the sender using the **ctx.send()** method with the sender address and an instance of the **Message** model.

7. Save the script.

The overall script for **alice** should look as follows:

```py
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

class Message(Model):
    message: str

SEED_PHRASE = "put_your_seed_phrase_here"

print(f"Your agent's address is: {Agent(seed=SEED_PHRASE).address}")

API_KEY = "put_your_API_key_here"

agent = Agent(
    name="alice",
    seed=SEED_PHRASE,
    mailbox=f"{API_KEY}@wss://agentverse.ai",
)

fund_agent_if_low(agent.wallet.address())

@agent.on_message(model=Message, replies={Message})
async def handle_message(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

    ctx.logger.info("Sending message to bob")
    await ctx.send(sender, Message(message="hello there bob"))

if __name__ == "__main__":
    agent.run()
```

**NOTE: You need to generate your SEED_PHRASE and API_KEY and substitute these into the above required fields for the script to run correctly.**

## Bob

1. Create a .py script for **bob**: `touch bob.py`
2. Import the necessary classes from the **uagents** and **uagents.setup**, and define the **Message** class for messages to be exchanged between our μAgents.

    ```py

    from uagents import Agent, Context, Model
    from uagents.setup import fund_agent_if_low


    class Message(Model):
        message: str
    ```

3. Define **ALICE_ADDRESS** by copyng the address generated in the script for **alice** above.

    ```py
    ALICE_ADDRESS = "paste_alice_address_here"
    ```

4. Generate a second **seed phrase** (e.g. https://pypi.org/project/mnemonic/).

    ```py
    SEED_PHRASE = "put_your_seed_phrase_here"
    ```

5. Copy the address showed below.

    ```py
    print(f"Your agent's address is: {Agent(seed=SEED_PHRASE).address}")
    ```

6. Head towards the [Agentverse](https://agentverse.ai) to get your **API key** and register a second agent.

    ```py
    API_KEY = "put_your_API_key_here"

    bob = Agent(
        name="bob",
        seed=SEED_PHRASE,
        mailbox=f"{API_KEY}@wss://agentverse.ai",
    )

    fund_agent_if_low(bob.wallet.address())
    ```

7. Define a send message function for messages to be sent by **bob**. 

    ```py
    @bob.on_interval(period=2.0)
    async def send_message(ctx: Context):
        ctx.logger.info("Sending message to alice")
        await ctx.send(ALICE_ADDRESS, Message(message="hello there alice"))
    ```

    Here, we define a **send_message()** coroutine function that is scheduled to run periodically every 2 seconds using the **.on_interval()** decorator. Inside the coroutine, a message of type **Message** is sent to **alice**'s address using the **ctx.send()** method.

8. Define a message handler for **bob** to handle incoming messages from 

    ```py
    @bob.on_message(model=Message, replies=set())
    async def on_message(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")

    if __name__ == "__main__":
        bob.run()
    ```

9. Save the script.

The overall script for bob should look as follows: 

```py
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

class Message(Model):
    message: str

ALICE_ADDRESS = "paste_alice_address_here"

SEED_PHRASE = "put_your_seed_phrase_here"

print(f"Your agent's address is: {Agent(seed=SEED_PHRASE).address}")

API_KEY = "put_your_API_key_here"

bob = Agent(
    name="bob",
    seed=SEED_PHRASE,
    mailbox=f"{API_KEY}@wss://agentverse.ai",
)

fund_agent_if_low(bob.wallet.address())

@bob.on_interval(period=2.0)
async def send_message(ctx: Context):
    ctx.logger.info("Sending message to alice")
    await ctx.send(ALICE_ADDRESS, Message(message="hello there alice"))


@bob.on_message(model=Message, replies=set())
async def on_message(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")


if __name__ == "__main__":
    bob.run()
```

**NOTE: You need to generate your SEED_PHRASE and API_KEY and substitute these into the above required fields for the script to run correctly. Here, you also need to provide bob with ALICE_ADDRESS field.** 

## Run the scripts

Now, we are ready to run our scripts. Run **alice** and **bob** from different terminals. The received messages will print out in each terminal. 

- Terminal 1: `python bob.py`
- Terminal 2: `python alice.py`
