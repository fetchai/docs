# Connecting to a blockchain 

After successfully installing CosmPy, you can begin interacting with Cosmos-based blockchains by following these steps.
1. Start by setting up a new Python project where you'll be using the CosmPy library.
2. Import the CosmPy library into your Python project to gain access to its functionalities.
3. To start interacting with a blockchain, you first need to establish a connection to a network node. You can use `LedgerClient` as a client object which takes a `NetworkConfig` as an argument. 


```py
import cosmpy

from cosmpy.aerial.client import LedgerClient, NetworkConfig

ledger_client = LedgerClient(NetworkConfig.fetch_mainnet())

```
In the code snippet above, networks' configurations are provided automatically. For example, `NetworkConfig.fetch_mainnet()` is the configuration for the Fetch ledger. However CosmPy allows you to customize the network configuration and interact with other chains. You can explore a full list of chain identifiers, denominations and end-point at this [chain registry](https://github.com/cosmos/chain-registry/).  

Below is an example of a custom network configuration. 

```py
cfg = NetworkConfig(
    chain_id="cosmoshub-4",
    url="grpc+https://grpc-cosmoshub.blockapsis.com:429",
    fee_minimum_gas_price=1,
    fee_denomination="uatom",
    staking_denomination="uatom",
)

ledger_client = LedgerClient(cfg)
```