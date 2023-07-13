# Remote Communication between μAgents

The Almanac contract allows μAgents to interact remotely from different locations across the internet. All you need to know is the recipient agent's address to query its information.

To simulate a remote communication between μAgents by running two agents, alice and bob, on different ports and terminals on the same device, let's start by creating two agents separately. 

## Alice

1. Create a .py scripts for this task: `touch remote_agent_alice.py`. Open this script on the text editor application of your choice.  

2. Import the necessary classes from **uagents** and **uagents.setup**.

    ```py
    from uagents.setup import fund_agent_if_low
    from uagents import Agent, Context, Model
    ```
   
3. Define the **Message** class. which is a model for the message that **alice** will send to **bob** agent. It has a single attribute **message** of type string (**str**).

    ```py
    class Message(Model):
        message: str
    ```

4. Define the **RECIPIENT_ADDRESS** (i.e., **bob**'s μAgent address in this example) and our μAgent, **alice**. 

    ```py
    RECIPIENT_ADDRESS = "agent1q2kxet3vh0scsf0sm7y2erzz33cve6tv5uk63x64upw5g68kr0chkv7hw50"
    
    alice = Agent( 
        name="alice",
        port=8000,
        seed="alice secret phrase",
        endpoint=["http://127.0.0.1:8000/submit"],
    )
    
    fund_agent_if_low(alice.wallet.address())
    ```

    We create a μAgent named **alice** and define its endpoints as a list of strings. **alice** is configured with: 

     - **name**: it is the name of the μAgent.
     - **port**: it specifies which port the agent should be uses for communication
     - **seed**: it is a secret phrase used to generate the μAgent's private key. Make sure to add a seed to your μAgent, so you don't have to fund different addresses each time you run your agent.
    
     The **fund_agent_if_low()** checks if the balance of the μAgent's wallet is below a certain threshold, and if so, sends a transaction to fund the wallet with a specified amount of cryptocurrency.

5. Define **alice**'s functions and behaviours. We start by defining an interval task for this agent, so for it to send a message to the recipient address every 2 seconds.

    ```py
    @alice.on_interval(period=2.0)
    async def send_message(ctx: Context):
        await ctx.send(RECIPIENT_ADDRESS, Message(message="hello there bob")
    ```

    The **@alice.on_interval(period=2.0)** decorator schedules the **send_message()** coroutine function to run every 2 seconds. The **send_message()** function accepts a **Context** object, **ctx**, as an argument. Inside the **send_message()** function, there is an asynchronous call **await ctx.send(RECIPIENT_ADDRESS, Message(message="hello there bob"))**. This call sends a message with the content, "**hello there bob**", to the recipient specified by the **RECIPIENT_ADDRESS** variable.

6. Define a message handler function for **alice** to handle or upcoming messages from **bob**.

    ```py
    @alice.on_message(model=Message)
    async def message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")
    
    if __name__ == "__main__":
        alice.run()
    ```

    The **@alice.on_message(model=Message)** decorator registers the **message_handler()** coroutine function as a handler for incoming messages of type **Message** from bob. The **message_handler()** function accepts three arguments:

     - **ctx**: a Context object that provides context and configuration information to the function.
     - **sender**: a string representing the sender of the message.
     - **msg**: a **Message** object representing the incoming message.

    The **ctx.logger.info()** method is called to log information about the received message, including the sender (**bob**) and message content.

7. The overall script for **alice** should look as follows:
    
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

1. Create a .py scripts for this task: `touch remote_agent_bob.py`. Open this script on the text editor application of your choice.  

2. Import the necessary classes from **uagents** and **uagents.setup**.

    ```py
    from uagents.setup import fund_agent_if_low
    from uagents import Agent, Context, Model
    ```
3. Define the **Message** class. which is a model for the message that **bob** will send to **alice** agent. It has a single attribute **message** of type string (**str**).

    ```py
    class Message(Model):
        message: str
    ```
   
4. Define the second μAgent, **bob**. 

    ```py
    bob = Agent(
        name="bob",
        port=8001,
        seed="bob secret phrase",
        endpoint=["http://127.0.0.1:8001/submit"],
    )
    
    fund_agent_if_low(bob.wallet.address())
    ```

    We create a μAgent named **bob** and define its endpoints as a list of strings. The **fund_agent_if_low()** checks if the balance of the μAgent's wallet is below the threshold and funds  it if needed.

5. Define a message handler function to print out **alice**'s messages and respond to it afterwards.

    ```py
    @bob.on_message(model=Message)
    async def message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")
    
        await ctx.send(sender, Message(message="hello there alice"))
    
    if __name__ == "__main__":
        bob.run()
    ```

    The **message_handler()** function is a coroutine function that is executed when a message is received by the agent with the **bob.on_message()** decorator. This function logs the received message using the agent's logger and sends a response message back to the original sender with the **ctx.send()** method. The response message contains the **Message** data model with a "**hello there alice**" message.

6. The overall script for bob should be:

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

Now, we are ready to run our scripts. First run **bob** and then **alice** from different terminals. They will register automatically in the Almanac contract using their funds. The received messages will print out in each terminal. 

- Bob: `python remote_agent_bob.py`

- Alice: `python remote_agent_alice.py`
