# Sending funds

CosmPy simplifies broadcasting transactions. After [creating a wallet↗️](/guides/CosmPy/CreatingWallet.md) you can send transactions by following the provided example. In it we first connect to the desired network then provide the desired destination address. The transaction is then broadcast using the `Ledger_client.send_tokens` function. 

```py
from cosmpy.aerial.client import LedgerClient, NetworkConfig

# Establishing connection to the network 
ledger_client = LedgerClient(NetworkConfig.fetch_mainnet())
# Providing destination address 
destination_address = 'fetch1h2l3cnu7e23whmd5yrfeunacez9tv0plv5rxqy'
# Broadcasting the transaction
tx = ledger_client.send_tokens(destination_address, 10, "atestfet", wallet)

# block until the transaction has been successful or failed
tx.wait_to_complete()
```

In this example, we want to send 10 atestfet tokens to the `destination_address`. The `send_tokens()` method is called on the `ledger_client` object, which is an instance of the `LedgerClient` class used to interact with the Fetch.ai blockchain. The parameter wallet is the local wallet used to sign the transaction and provide the necessary credentials. The code then waits for the transaction to complete (either successfully or failed) before proceeding further.

## Sending and veryfing a transaction 

For a more comprehensive example we'll use the testnet and submit a transaction then verify it's completion by exploring  the output on the terminal. For transactions made on the mainnet it's advisable to use our [blockexplorer↗️](https://explore.fetch.ai/) or a block explorer such as [Mintscan↗️](https://www.mintscan.io/fetchai). The following code snippet shows you how to create two wallets, namely Alice and Bob's. Once created, the next step is to establish a connection to Fetch.ai's testnet. We then query Alice's balance and include a while function to make sure Alice has a positive balance and can perform the transaction, in this case Alice will send Bob 10 atestfet. As a final step we'll print the transaction hash, as well as Bob and Alice's balances. 

```py copy

# Import the required libraries and modules 
from cosmpy.aerial.client import LedgerClient, NetworkConfig # Required to establish a connection to the network
from cosmpy.aerial.faucet import FaucetApi # Required to fund Alice's wallet if she has a 0 balance
from cosmpy.aerial.wallet import LocalWallet # Required to create Alice and Bob's local wallets 


def main():
    """Run main."""
    # Create Alice and Bob's wallets
    alice = LocalWallet.generate()
    bob = LocalWallet.generate()
     
    # Establish a connection to the testnet 
    ledger = LedgerClient(NetworkConfig.fetchai_stable_testnet())
    faucet_api = FaucetApi(NetworkConfig.fetchai_stable_testnet())
    
    # Query Alice's Balance
    alice_balance = ledger.query_bank_balance(bob.address())
    # Should alice have no funds in her wallet, add funds
    while alice_balance < (10**18):
        print("Providing wealth to alice...")
        faucet_api.get_wealth(alice.address())
        alice_balance = ledger.query_bank_balance(alice.address())
    
    # Print Alice and Bob's addresses and balances 
    print(
        f"Alice Address: {alice.address()} Balance: {ledger.query_bank_balance(alice.address())}"
    )
    print(
        f"Bob   Address: {bob.address()} Balance: {ledger.query_bank_balance(bob.address())}"
    )
    
    # Broadcast the transaction and print the outputs on the terminal 
    tx = ledger.send_tokens(bob.address(), 10, "atestfet", alice)
    print(f"TX {tx.tx_hash} waiting to complete...")
    tx.wait_to_complete()
    print(f"TX {tx.tx_hash} waiting to complete...done")

    print(
        f"Alice Address: {alice.address()} Balance: {ledger.query_bank_balance(alice.address())}"
    )
    print(
        f"Bob   Address: {bob.address()} Balance: {ledger.query_bank_balance(bob.address())}"
    )


if __name__ == "__main__":
    main()
```