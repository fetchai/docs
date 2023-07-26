# μAgents local communication

To show μAgents interacting, we need to create a second μAgent, **bob**.

1. Create a .py script for this task: `agents_communication.py`

2. Import necessary classes from **uagents** library and define the message structure for messages to be exchanged. 

    ```py
    from uagents import Agent, Context, Bureau, Model

    class Message(Model):
        text: str
    ```
   We use the class **Model** from **uagents** library to define a message structure for messages to be exchanged between the two μAgents. 

3. Create the μAgents instances of the class **Agent**. 

    ```py 
    alice = Agent(name="alice", seed="alice recovery phrase")
    bob = Agent(name="bob", seed="bob recovery phrase")
    ```

4. Define the **alice** μAgent behavior. We can use the **.on_interval()** decorator to run periodically every 2 a **send_message()** coroutine function. The message is sent from **alice** to **bob** using the **ctx.send()** method of the **Context** object, with **bob.address** as the recipient and an instance of the **Message** model.

    ```py 
    @alice.on_interval(period=3.0)
    async def send_message(ctx: Context):
       await ctx.send(bob.address, Message(message="hello there bob"))
    ```

5. Define an **.on_message()** decorator to define a **message_handler()** coroutine function for **bob** to handle incoming messages from **alice**.

    ```py
    @bob.on_message(model=Message)
    async def bob_message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")
        await ctx.send(alice.address, Message(message="hello there alice"))
    ```

   This function is triggered whenever **bob** receives a message of type **Message**. The function logs the received message and its sender using the **ctx.logger.info()** method. We can also add a response from **bob** to **alice**: we need to add a **ctx.send()** method for a message being sent from **bob** to **alice.address*. 

6. Define a **message_handler()** function for **alice** to be capable of managing and printing out **bob**'s response message.

    ```py
    @alice.on_message(model=Message)
    async def alice_message_handler(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")
    ```

7. Create a **bureau** object as an instance of the **Bureau** class, and add both μAgents to it in order to run them from the same script.

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

On your terminal, make sure to be in the right directory for your project and activate the virtual environment.

Run the script: `python agents_communication.py`
