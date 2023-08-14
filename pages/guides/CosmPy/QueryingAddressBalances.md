# Querying Balances 

Once you’ve established a connection to a network node [Guide on connecting ↗️ ](/guides/CosmPy/EstablishingNodeConnection.md) you can use the `LegderClient` object to perform many useful operations such as querying balances. In particular the `LedgerClient` object allows you to: 
1. Query all balances associated with a particular address 
2. Query all balances associated with a particular denomination 

Let’s explore how to achieve both. We’ll start by importing CosmPy as well as the relevant modules. We’ll then connect to the chain we want to perform the query on. Once connected we will specify the address we want to query. In our example we’re connected to the Fetch.ai mainnet and we’re querying all balances associated with a particular address. 

```py copy 
import cosmpy

from cosmpy.aerial.client import LedgerClient, NetworkConfig

ledger_client = LedgerClient(NetworkConfig.fetch_mainnet())

address: str = 'fetch12q5gw9l9d0yyq2th77x6pjsesczpsly8h5089x'
balances = ledger_client.query_bank_all_balances(address)
print(balances)
```
Querying all balances associated with a particular address returns a `List` of `Coin` objects that contain amount and denom variables that correspond to all the funds held at the address and their denominations. This list includes all natively defined coins along with any tokens transferred using the inter-blockchain communication [IBC ↗️ ](https://ibcprotocol.org/) protocol. Once successful, you'll see the following input in the terminal. 

```py copy
[Coin(amount='1616060698998992698400', denom='afet'), Coin(amount='10', denom='ibc/605C5B80A8253543F8038F96F56BA13BDD8D300E12F1B32A3FA2E1EB2A933FA1'), Coin(amount='5000000', denom='ibc/B58E6786772640EC4B538AFC4393F742C326734B74CCAFAFBF7EFDC7D435B428')]
```

In order to query all balances associated with a particular denomination we can run the same script but substitute the final balance command with: 

```py 
balance = ledger_client.query_bank_balance(address, denom='afet')
```

which will return the value of the (integer) funds held by the address with the specified 
denomination. If the `denom` argument is omitted the function will return the fee denomination specified in the `NetworkConfig` object used to initialize the `LedgerClient`