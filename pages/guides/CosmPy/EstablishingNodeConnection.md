# Connecting to a blockchain 

With CosmPy installed you can connect and begin interacting with Cosmos-based blockchains by following the example below. 

```py
import cosmpy

from cosmpy.aerial.client import LedgerClient, NetworkConfig

#Connecting to the Fetch.ai mainnet
ledger_client = LedgerClient(NetworkConfig.fetch_mainnet())

```

In the code snippet above we're using the `LedgerClient` as a client object which takes a `NetworkConfig` as an argument. For ease of use network configurations are provided automatically. For example, `NetworkConfig.fetch_mainnet()` is the configuration for the Fetch ledger. However CosmPy allows you to customize the network configuration and interact with other chains. You can explore a full list of chain identifiers, denominations and end-point at this [chain registry↗️](https://github.com/cosmos/chain-registry/).  

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