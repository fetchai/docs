# How to use uAgents to send tokens

In this guide, we show how to set up two agents, **alice** and **bob**, with **alice** periodically sending payment requests to **bob**, and **bob** processing these requests by sending payments and providing transaction information back to **alice**. 

1. First of all,create a Python script for this task, and name it: `touch sending_tokens.py`
2. Then, import the necessary modules from the **uagents**, **uagents.network**, and **uagents.setup**.

    ```py copy
    from uagents import Agent, Bureau, Context, Model
    from uagents.network import wait_for_tx_to_complete
    from uagents.setup import fund_agent_if_low
    ``` 

   - **Agent**: Used to create autonomous agents. 
   - **Bureau**: Manages the agents and their execution. 
   - **Context**: Provides contextual information to agents during execution. 
   - **Model**: Used to define data models for message exchange between agents. 
   - **wait_for_tx_to_complete**: Waits for a transaction to be completed. 
   - **fund_agent_if_low**: Ensures an agent has sufficient funds in its wallet.

3. Let's then define two data models: **PaymentRequest** and **TransactionInfo**. Then, let's set up the values for the **AMOUNT** and **DENOM** variables, which define the default amount and denomination for the payment requests.

    ```py copy
    class PaymentRequest(Model):
        wallet_address: str
        amount: int
        denom: str

    class TransactionInfo(Model):
        tx_hash: str
   
    AMOUNT = 100
    DENOM = "atestfet"
    ```

    - The **PaymentRequest()** model represents a payment request which contains the **wallet_address**, **amount**, and **denom**.

    - The **TransactionInfo()** model represents information about a transaction and contains a single attribute, **tx_hash**.

4. Let's define our μAgents, **alice** and **bob** and ensure they have enough funds in their wallets to carry out transactions. 

    ```py copy 
    alice = Agent(name="alice", seed="alice secret phrase")
    bob = Agent(name="bob", seed="bob secret phrase")

    fund_agent_if_low(alice.wallet.address())
    fund_agent_if_low(bob.wallet.address())
    ```

5. We can now define our μAgents functions.

    ```py copy
    @alice.on_interval(period=10.0)
    async def request_funds(ctx: Context):
        await ctx.send(
            bob.address,
            PaymentRequest(
                wallet_address=str(ctx.wallet.address()), amount=AMOUNT, denom=DENOM
            ),
        )
    ```

    This defines an event handler for alice using the **.on_interval** decorator. This event handler is triggered at regular intervals of **10.0** seconds in this case. The event handler function is named **request_funds** and takes a **ctx** parameter of type **Context**. Within the function, **alice** sends a payment request message to **bob** by using the **ctx.send** method. The **ctx.send** method is called with the recipient address, **bob.address**, which specifies that the message should be sent to **bob**. The message is an instance of the **PaymentRequest()** model. It contains **alice**'s wallet address (**ctx.wallet.address**), the amount (**AMOUNT**), and the denomination (**DENOM**).

6. We can now define a **confirm_transaction** message handler for **alice** to handle incoming messages from **bob** of type **TransactionInfo**.

    ```py copy
    @alice.on_message(model=TransactionInfo)
    async def confirm_transaction(ctx: Context, sender: str, msg: TransactionInfo):
        ctx.logger.info(f"Received transaction info from {sender}: {msg}")
        tx_resp = await wait_for_tx_to_complete(msg.tx_hash)

        coin_received = tx_resp.events["coin_received"]
        if (
            coin_received["receiver"] == str(ctx.wallet.address())
            and coin_received["amount"] == f"{AMOUNT}{DENOM}"
        ):
            ctx.logger.info(f"Transaction was successful: {coin_received}")
    ```

    The event handler function is named **confirm_transaction** and takes three parameters: **ctx**, **sender**, and **msg**. Within the function, **alice** logs an informational message using the **ctx.logger.info** method, indicating the receipt of transaction information from the sender agent, **bob**, and displaying the **msg** object. The **wait_for_tx_to_complete** function is used to await the completion of the transaction specified by the **tx_hash** received in the message.

    Once the transaction is completed, the code accesses the **coin_received** event from the transaction response using **tx_resp.events[\"coin_received\"]**. It checks if the receiver address matches **alice**'s wallet address (**ctx.wallet.address**) and if the amount received matches the expected amount (**AMOUNT + DENOM**).

    If the conditions are met, **alice** logs another informational message indicating the success of the transaction and displaying the details of the received coins.

7. Let's now define an event handler for **bob**. This event handler is triggered when **bob** receives a message of type **PaymentRequest** from **alice**.

   ```py copy
   @bob.on_message(model=PaymentRequest, replies=TransactionInfo)
   async def send_payment(ctx: Context, sender: str, msg: PaymentRequest):
       ctx.logger.info(f"Received payment request from {sender}: {msg}")

       transaction = ctx.ledger.send_tokens(
           msg.wallet_address, msg.amount, msg.denom, ctx.wallet
       )

       await ctx.send(alice.address, TransactionInfo(tx_hash=transaction.tx_hash))
   ```

   The event handler function is named **send_payment()** and takes three parameters: **ctx**, **sender**, and **msg**. Within the function, **bob** logs an informational message using the **ctx.logger.info()** method, indicating the receipt of a payment request from the sender agent, **bob**,  and displaying the **msg** object.

   Next, the code performs a payment transaction using the **ctx.ledger.send_tokens()** method. It takes the wallet address (**msg.wallet_address**), amount (**msg.amount**), denomination (**msg.denom**), and **ctx.wallet** as parameters. This method is responsible for sending the requested payment.

   Once the transaction is completed, **bob** sends a message back to **alice** to inform her about the transaction, using **ctx.send()**. The message is created using the **TransactionInfo** model with the **tx_hash** obtained from the transaction response. The **await ctx.send()** method is used to send this message to alice using her address (**alice.address**).

8. We are now ready to add both μAgents to the **Bureau** object for them to be run together.

```py copy
bureau = Bureau()
bureau.add(alice)
bureau.add(bob)

if __name__ == "__main__":
    bureau.run()
```

The overall code for this example should look as follows: 

```py copy filename="sending_tokens.py"
from uagents import Agent, Bureau, Context, Model
from uagents.network import wait_for_tx_to_complete
from uagents.setup import fund_agent_if_low

class PaymentRequest(Model):
    wallet_address: str
    amount: int
    denom: str

class TransactionInfo(Model):
    tx_hash: str

AMOUNT = 100
DENOM = "atestfet"

alice = Agent(name="alice", seed="alice secret phrase")
bob = Agent(name="bob", seed="bob secret phrase")

fund_agent_if_low(alice.wallet.address())
fund_agent_if_low(bob.wallet.address())

@alice.on_interval(period=10.0)
async def request_funds(ctx: Context):
    await ctx.send(
        bob.address,
        PaymentRequest(
            wallet_address=str(ctx.wallet.address()), amount=AMOUNT, denom=DENOM
        ),
    )

@alice.on_message(model=TransactionInfo)
async def confirm_transaction(ctx: Context, sender: str, msg: TransactionInfo):
    ctx.logger.info(f"Received transaction info from {sender}: {msg}")
    tx_resp = await wait_for_tx_to_complete(msg.tx_hash)

    coin_received = tx_resp.events["coin_received"]
    if (
        coin_received["receiver"] == str(ctx.wallet.address())
        and coin_received["amount"] == f"{AMOUNT}{DENOM}"
    ):
        ctx.logger.info(f"Transaction was successful: {coin_received}")

@bob.on_message(model=PaymentRequest, replies=TransactionInfo)
async def send_payment(ctx: Context, sender: str, msg: PaymentRequest):
    ctx.logger.info(f"Received payment request from {sender}: {msg}")

    transaction = ctx.ledger.send_tokens(
        msg.wallet_address, msg.amount, msg.denom, ctx.wallet
    )

    await ctx.send(alice.address, TransactionInfo(tx_hash=transaction.tx_hash))

bureau = Bureau()
bureau.add(alice)
bureau.add(bob)

if __name__ == "__main__":
    bureau.run()
```

## Run the script

On your terminal, make sure to be in the right directory for your project and activate the virtual environment.

Run the script: `python sending_tokens.py`
