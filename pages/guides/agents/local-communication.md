# μAgents local communication


The first step to better understand how μAgents communicate is to introduce how 2 μAgents perform a local communication. Let’s consider a basic example in which two μAgents say hello to each other.

## Walk-through example 

1. First of all, let's create a Python script for this task and name it: 

   `touch agents_communication.py`

2. Then, let's import these necessary classes from the **uagents** library: **Agent**, **Context**, **Bureau**, and **Model**. Let's then define the message structure for messages to be exchanged between the μAgents using the class **Model**. 

   Then, we would need to create the μAgents, **alice** and **bob**, with **name** and **seed** parameters.

    ```py copy
    from uagents import Agent, Context, Bureau, Model

    class Message(Model):
        text: str

    alice = Agent(name="alice", seed="alice recovery phrase")
    bob = Agent(name="bob", seed="bob recovery phrase")
    ```

3. Let's now define alice behaviors.

   - We need to define a function for **alice** to send messages to **bob** periodically.

    ```py copy
    @alice.on_interval(period=3.0)
    async def send_message(ctx: Context):
       await ctx.send(bob.address, Message(message="hello there bob"))
    ```

    We can use the **on_interval** decorator to define a coroutine **send_message** function that will be called every 3 seconds. The coroutine function sends a message to **bob** using the **ctx.send** method of the **Context** object.

   - We then need to define a function for **alice** to manage incoming messages.

    ```py
    @alice.on_message(model=Message)
    async def alice_message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")
    ```

   This defines the coroutine function **alice_message_handler** that serves as a message handler for **alice**. It is triggered whenever **alice** receives a message of type **Message**. The function logs the received message and its sender using the **ctx.logger.info** method.

4. Let's now define the behavior of our second agent, **bob**.

    ```py
    @bob.on_message(model=Message)
    async def bob_message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")
        await ctx.send(alice.address, Message(message="hello there alice"))
    ```

   Here, we have defined a coroutine **bob_message_handler** function that serves as the message handler for **bob**. It is triggered whenever bob receives a message of type **Message** from other agents. The function logs the received message and its sender using the **ctx.logger.info** method. Finally, we make **bob** compose a response message to be sent back using the **ctx.send** method with **alice.address** as the recipient address and an instance of the **Message** model as the message payload.

5. Let's then use the **Bureau** class to create a **Bureau** object. This will allow us to run μAgents together in the same script.

    ```py
    bureau = Bureau()
    bureau.add(alice)
    bureau.add(bob)

    if __name__ == "__main__":
        bureau.run()
    ```

The overall script for this task should look as follows:

```python
from uagents import Agent, Bureau, Context, Model

class Message(Model):
    message: str

alice = Agent(name="alice", seed="alice recovery phrase")
bob = Agent(name="bob", seed="bob recovery phrase")

@alice.on_interval(period=3.0)
async def send_message(ctx: Context):
   await ctx.send(bob.address, Message(message="hello there bob"))

@alice.on_message(model=Message)
async def alice_message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

@bob.on_message(model=Message)
async def bob_message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")
    await ctx.send(alice.address, Message(message="hello there alice"))

bureau = Bureau()
bureau.add(alice)
bureau.add(bob)
if __name__ == "__main__":
    bureau.run()
```

## Run the script

We are now ready to run the script: `python agents_communication.py`
