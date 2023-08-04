# Send Tokens

CosmPy simplifies broadcasting transactions. After [creating a wallet](/Users/nikolaydimitrov/FetchProjects/docs_v2/pages/guides/CosmPy/CreatingWallet.md) you can send transactions by following the provided example. In it we first connect to the desired network then provide the desired destination address. The transaction is then broadcast using the `Ledger_client.send_tokens` function. 

```py
from cosmpy.aerial.client import LedgerClient, NetworkConfig

#Establishing connection to the network 
ledger_client = LedgerClient(NetworkConfig.fetch_mainnet())
#Providing destination address 
destination_address = 'fetch1h2l3cnu7e23whmd5yrfeunacez9tv0plv5rxqy'
#Broadcasting the transaction
tx = ledger_client.send_tokens(destination_address, 10, "atestfet", wallet)

#block until the transaction has been successful or failed
tx.wait_to_complete()
```

In the example above, we want to send 10 atestfet tokens to the destination_address. The `send_tokens()` method is called on the `ledger_client` object, which is an instance of the `LedgerClient` class used to interact with the Fetch.ai blockchain. The parameter wallet is the local wallet used to sign the transaction and provide the necessary credentials. The code then waits for the transaction to complete (either successfully or failed) before proceeding further.
