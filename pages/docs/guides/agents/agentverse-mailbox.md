# How to use the AgentVerse Mailbox Service

In this tutorial, we show how to enable remote communications between μAgents through the Agentverse Mailbox Service. 
For information on this, visit the dedicated section in our [references section](/docs/references/contracts/uagents-almanac/register-in-the-agentverse-mailbox.md)

## Alice 

1. First of all, let's create a script for **alice**: `touch alice.py`
2. We then need to import the necessary classes from the **uagents** and **uagents.setup**, and define the **Message** class for messages to be exchanged between our μAgents:

    ```py copy
    from uagents import Agent, Context, Model
    from uagents.setup import fund_agent_if_low

    class Message(Model):
        message: str
    ```

3. Let's then generate a secure **seed phrase** (e.g. https://pypi.org/project/mnemonic/) and get the address of our agent. We then need to sign up at [Agentverse](https://agentverse.ai) to get an **API key**:

    ```py copy
    SEED_PHRASE = "put_your_seed_phrase_here"
   
    print(f"Your agent's address is: {Agent(seed=SEED_PHRASE).address}")

    API_KEY = "put_your_API_key_here"
    ```
4. We can now register our μAgent, **alice**:

    ```py copy
    alice = Agent(
        name="alice",
        seed=SEED_PHRASE,
        mailbox=f"{API_KEY}@wss://agentverse.ai",
    )

    fund_agent_if_low(alice.wallet.address())
    ```

5.  Let's define a message handler function for **alice**:

    ```py copy
    @alice.on_message(model=Message, replies={Message})
    async def handle_message(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")

        # send the response
        ctx.logger.info("Sending message to bob")
        await ctx.send(sender, Message(message="hello there bob"))


    if __name__ == "__main__":
        alice.run()
    ```
    
    We have defined a **handle_message** coroutine function that serves as the message handler for the agent. It is triggered whenever the agent receives a message of type **Message**. This function logs the received message and its sender using the **ctx.logger.info** method. It then sends a response message back to the sender using the **ctx.send** method with the sender address and an instance of the **Message** model.

6. Save the script.

The overall script for **alice** should look as follows:

```py copy filename="alice.py"
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

1. Let's now create anoter Python script for **bob**: `touch bob.py`
2. We can now import the necessary classes from the **uagents** and **uagents.setup**, and define the **Message** class for messages to be exchanged between our μAgents:

    ```py copy
    from uagents import Agent, Context, Model
    from uagents.setup import fund_agent_if_low

    class Message(Model):
        message: str
    ```

3. Define the **ALICE_ADDRESS** by copying the address generated in the script for **alice** above. Then, generate a second **seed phrase** (e.g. https://pypi.org/project/mnemonic/), and get the address for our second agent. You can now head towards the [Agentverse](https://agentverse.ai) to get the **API key** for this agent:

    ```py copy
    ALICE_ADDRESS = "paste_alice_address_here"

    SEED_PHRASE = "put_your_seed_phrase_here"
   
    print(f"Your agent's address is: {Agent(seed=SEED_PHRASE).address}")

    API_KEY = "put_your_API_key_here"
    ```

4. Let's now  register this second agent, **bob**:

    ```py copy
    bob = Agent(
        name="bob",
        seed=SEED_PHRASE,
        mailbox=f"{API_KEY}@wss://agentverse.ai",
    )

    fund_agent_if_low(bob.wallet.address())
    ```

5. Let's define function for **bob** to send messages:

    ```py copy
    @bob.on_interval(period=2.0)
    async def send_message(ctx: Context):
        ctx.logger.info("Sending message to alice")
        await ctx.send(ALICE_ADDRESS, Message(message="hello there alice"))
    ```

    Here, we have defined a **send_message()** coroutine function that is scheduled to run periodically every 2 seconds using the **.on_interval()** decorator. Inside the coroutine, a message of type **Message** is sent to **alice**'s address using the **ctx.send()** method.

6. Let's now define a message handler for **bob** to handle incoming messages: 

    ```py copy
    @bob.on_message(model=Message, replies=set())
    async def on_message(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")

    if __name__ == "__main__":
        bob.run()
    ```

7. Save the script.

The overall script for bob should look as follows: 

```py  copy filename="bob.py"
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

Now, we are ready to run our scripts. Run **alice** and **bob** from different terminals. The received messages will be printed out in each terminal. 

- Terminal 1: `python bob.py`
- Terminal 2: `python alice.py`
