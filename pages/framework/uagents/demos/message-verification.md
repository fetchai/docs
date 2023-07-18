# How to use uAgents to verify messages

In this demo, we show how to set up the code for 2 μAgents to exchange messages with one another, and sign them to ensure authenticity and prevent tampering. 

1. Navigate towards the directory you created for your project. 
2. Create a script for this task: `touch message_verification.py`.
3. Import necessary classes.

    ```py
    import hashlib
    from uagents import Agent, Bureau, Context, Model
    from uagents.crypto import Identity
    ```

4. Define a message format using the **Message** class as a subclass of **Model**.

    ```py
    class Message(Model):
        message: str
        digest: str
        signature: str
    ```
   The message format has three attributes: message, digest, and signature: 

    - **message**: a string representing the message text.
    - **digest**: a string representing the SHA-256 hash of the message. 
    - **signature**: a string representing the digital signature of the hash using the sender's private key.

5. Define an **encode()** function.

    ```py
    def encode(message: str) -> bytes:
        hasher = hashlib.sha256()
        hasher.update(message.encode())
        return hasher.digest()
    ```

     This one is defined to hash a string message using the SHA-256 algorithm and return the resulting digest as bytes. This is used to generate the digest for each message before it is signed.

6. Create the μAgents instances of the **Agent** class.

    ```py
    alice = Agent(name="alice", seed="alice recovery password")
    bob = Agent(name="bob", seed="bob recovery password")
    ```

7. Define a **send_message()** function for **alice** to send messages to **bob**. 

    ```py
    @alice.on_interval(period=3.0)
    async def send_message(ctx: Context):
        msg = "hello there bob"
        digest = encode(msg)
        await ctx.send(
            bob.address,
            Message(message=msg, digest=digest.hex(), signature=alice.sign_digest(digest)),
        )
    ```

    This function is decorated using the **@alice.on_interval()** decorator, which indicates that the function is called periodically every **3.0** seconds to send messages to **bob**'s address. It takes in a single argument **ctx**. The function first creates a message, **msg**, and computes its digest using the **encode()** function. The message is then sent to bob using the **ctx.send()** method, along with the **digest** and a **signature** of the digest using the **alice.sign_digest()** function.

8. Define an **alice_rx_message()** function used to receive and process messages sent by **bob**.

    ```py
    @alice.on_message(model=Message)
    async def alice_rx_message(ctx: Context, sender: str, msg: Message):
        assert Identity.verify_digest(
            sender, bytes.fromhex(msg.digest), msg.signature
        ), "couldn't verify bob's message"

        ctx.logger.info("Bob's message verified!")
        ctx.logger.info(f"Received message from {sender}: {msg.message}")
    ```

    This function is decorated using the **@alice.on_message()**, indicating that the function is triggered when a message is being received of type **Message**. The function takes in three arguments: **ctx**, **sender**, and **msg**.  

    The first thing the function does is verify the authenticity of the message using the **Identity.verify_digest()** function. If the message cannot be verified, the function raises an assertion error. Assuming the message is verified, the function logs a message indicating that the message was verified and another message indicating the contents of the message.

9. Define a **bob_rx_message()** function used by **bob** to receive and process messages sent by **alice**.

    ```py
    @bob.on_message(model=Message)
    async def bob_rx_message(ctx: Context, sender: str, msg: Message):
        assert Identity.verify_digest(
            sender, bytes.fromhex(msg.digest), msg.signature
        ), "couldn't verify alice's message"
        ctx.logger.info("Alice's message verified!")

        ctx.logger.info(f"Received message from {sender}: {msg.message}")

        msg = "hello there alice"
        digest = encode(msg)

        await ctx.send(
            alice.address,
            Message(message=msg, digest=digest.hex(), signature=bob.sign_digest(digest)),
        )
    ```

    This function is decorated using the **@bob.on_message()**, indicating that the function is triggered when a message is being received of type **Message**. takes in three arguments: **ctx**, **sender**, and **msg**.

    The function firstly verifies the authenticity of the message using the **Identity.verify_digest()** function. If the message cannot be verified, the function raises an assertion error. On the other hand, if the message is verified, the function logs a message indicating that the message was verified and another message indicating the contents of the message using the **ctx.logger.info()** method.

    The function then creates a response message, **msg**, and computes its digest using the **encode()** function. The response message is then sent to **alice** using the **ctx.send()** method.

10. Add both μAgents to a Bureau object for them to be run together.

    ```py
    bureau = Bureau()
    bureau.add(alice)
    bureau.add(bob)

    if __name__ == "__main__":
        bureau.run()
    ```
11. Save the script

The overall script should look as follows: 

```py
import hashlib
from uagents import Agent, Bureau, Context, Model
from uagents.crypto import Identity

class Message(Model):
    message: str
    digest: str
    signature: str

def encode(message: str) -> bytes:
    hasher = hashlib.sha256()
    hasher.update(message.encode())
    return hasher.digest()

alice = Agent(name="alice", seed="alice recovery password")
bob = Agent(name="bob", seed="bob recovery password")

@alice.on_interval(period=3.0)
async def send_message(ctx: Context):
    msg = "hello there bob"
    digest = encode(msg)
    await ctx.send(
        bob.address,
        Message(message=msg, digest=digest.hex(), signature=alice.sign_digest(digest)),
    )

@alice.on_message(model=Message)
async def alice_rx_message(ctx: Context, sender: str, msg: Message):
    assert Identity.verify_digest(
        sender, bytes.fromhex(msg.digest), msg.signature
    ), "couldn't verify bob's message"

    ctx.logger.info("Bob's message verified!")
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

@bob.on_message(model=Message)
async def bob_rx_message(ctx: Context, sender: str, msg: Message):
    assert Identity.verify_digest(
        sender, bytes.fromhex(msg.digest), msg.signature
    ), "couldn't verify alice's message"
    ctx.logger.info("Alice's message verified!")

    ctx.logger.info(f"Received message from {sender}: {msg.message}")

    msg = "hello there alice"
    digest = encode(msg)

    await ctx.send(
        alice.address,
        Message(message=msg, digest=digest.hex(), signature=bob.sign_digest(digest)),
    )

bureau = Bureau()
bureau.add(alice)
bureau.add(bob)

if __name__ == "__main__":
    bureau.run()
```

## Run your script

On your terminal, make sure you are in the right directory and activate your virtual environment.

Run the script: `python message_verification.py`.
