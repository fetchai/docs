# src.uagents.network

Network and Contracts.

## InsufficientFundsError Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L47)

```python
class InsufficientFundsError(Exception)
```

Raised when an agent has insufficient funds for a transaction.

#### get_ledger [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L64)

```python
def get_ledger(test: bool = True) -> LedgerClient
```

Get the Ledger client.

**Arguments**:

- `test` _bool_ - Whether to use the testnet or mainnet. Defaults to True.

**Returns**:

- `LedgerClient` - The Ledger client instance.

#### get_faucet [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L79)

```python
def get_faucet() -> FaucetApi
```

Get the Faucet API instance.

**Returns**:

- `FaucetApi` - The Faucet API instance.

#### add_testnet_funds [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L89)

```python
def add_testnet_funds(wallet_address: str)
```

Add testnet funds to the provided wallet address.

**Arguments**:

- `wallet_address` _str_ - The wallet address to add funds to.

#### parse_record_config [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L101)

```python
def parse_record_config(
    record: Optional[Union[str, List[str], Dict[str, dict]]]
) -> Optional[List[Dict[str, Any]]]
```

Parse the user-provided record configuration.

**Returns**:

Optional[List[Dict[str, Any]]]: The parsed record configuration in correct format.

#### wait_for_tx_to_complete [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L124)

```python
async def wait_for_tx_to_complete(
        tx_hash: str,
        ledger: LedgerClient,
        timeout: Optional[timedelta] = None,
        poll_period: Optional[timedelta] = None) -> TxResponse
```

Wait for a transaction to complete on the Ledger.

**Arguments**:

- `tx_hash` _str_ - The hash of the transaction to monitor.
- `ledger` _LedgerClient_ - The Ledger client to poll.
- `timeout` _Optional[timedelta], optional_ - The maximum time to wait.
  the transaction to complete. Defaults to None.
- `poll_period` _Optional[timedelta], optional_ - The time interval to poll

**Returns**:

- `TxResponse` - The response object containing the transaction details.

## AlmanacContract Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L161)

```python
class AlmanacContract(LedgerContract)
```

A class representing the Almanac contract for agent registration.

This class provides methods to interact with the Almanac contract, including
checking if an agent is registered, retrieving the expiry height of an agent's
registration, and getting the endpoints associated with an agent's registration.

#### check_version [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L170)

```python
def check_version() -> bool
```

Check if the contract version supported by this version of uAgents matches the
deployed version.

**Returns**:

- `bool` - True if the contract version is supported, False otherwise.

#### query_contract [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L194)

```python
def query_contract(query_msg: Dict[str, Any]) -> Any
```

Execute a query with additional checks and error handling.

**Arguments**:

- `query_msg` _Dict[str, Any]_ - The query message.

**Returns**:

- `Any` - The query response.

**Raises**:

- `RuntimeError` - If the contract address is not set or the query fails.

#### get_contract_version [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L216)

```python
def get_contract_version() -> str
```

Get the version of the contract.

**Returns**:

- `str` - The version of the contract.

#### is_registered [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L228)

```python
def is_registered(address: str) -> bool
```

Check if an agent is registered in the Almanac contract.

**Arguments**:

- `address` _str_ - The agent's address.

**Returns**:

- `bool` - True if the agent is registered, False otherwise.

#### registration_needs_update [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L243)

```python
def registration_needs_update(address: str, endpoints: List[AgentEndpoint],
                              protocols: List[str],
                              min_seconds_left: int) -> bool
```

Check if an agent's registration needs to be updated.

**Arguments**:

- `address` _str_ - The agent's address.
- `endpoints` _List[AgentEndpoint]_ - The agent's endpoints.
- `protocols` _List[str]_ - The agent's protocols.
- `min_time_left` _int_ - The minimum time left before the agent's registration expires

**Returns**:

- `bool` - True if the agent's registration needs to be updated or will expire sooner
  than the specified minimum time, False otherwise.

#### query_agent_record [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L273)

```python
def query_agent_record(
        address: str) -> Tuple[int, List[AgentEndpoint], List[str]]
```

Get the records associated with an agent's registration.

**Arguments**:

- `address` _str_ - The agent's address.

**Returns**:

Tuple[int, List[AgentEndpoint], List[str]]: The expiry height of the agent's
registration, the agent's endpoints, and the agent's protocols.

#### get_expiry [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L310)

```python
def get_expiry(address: str) -> int
```

Get the approximate seconds to expiry of an agent's registration.

**Arguments**:

- `address` _str_ - The agent's address.

**Returns**:

- `int` - The approximate seconds to expiry of the agent's registration.

#### get_endpoints [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L322)

```python
def get_endpoints(address: str) -> List[AgentEndpoint]
```

Get the endpoints associated with an agent's registration.

**Arguments**:

- `address` _str_ - The agent's address.

**Returns**:

- `List[AgentEndpoint]` - The agent's registered endpoints.

#### get_protocols [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L334)

```python
def get_protocols(address: str) -> List[str]
```

Get the protocols associated with an agent's registration.

**Arguments**:

- `address` _str_ - The agent's address.

**Returns**:

- `List[str]` - The agent's registered protocols.

#### register [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L368)

```python
async def register(ledger: LedgerClient, wallet: LocalWallet,
                   agent_address: str, protocols: List[str],
                   endpoints: List[AgentEndpoint], signature: str,
                   current_time: int)
```

Register an agent with the Almanac contract.

**Arguments**:

- `ledger` _LedgerClient_ - The Ledger client.
- `wallet` _LocalWallet_ - The agent's wallet.
- `agent_address` _str_ - The agent's address.
- `protocols` _List[str]_ - List of protocols.
- `endpoints` _List[Dict[str, Any]]_ - List of endpoint dictionaries.
- `signature` _str_ - The agent's signature.

#### register_batch [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L416)

```python
async def register_batch(ledger: LedgerClient, wallet: LocalWallet,
                         agent_records: List[AlmanacContractRecord])
```

Register multiple agents with the Almanac contract.

**Arguments**:

- `ledger` _LedgerClient_ - The Ledger client.
- `wallet` _LocalWallet_ - The wallet of the registration sender.
- `agents` _List[ALmanacContractRecord]_ - The list of signed agent records to register.

#### get_sequence [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L464)

```python
def get_sequence(address: str) -> int
```

Get the agent's sequence number for Almanac registration.

**Arguments**:

- `address` _str_ - The agent's address.

**Returns**:

- `int` - The agent's sequence number.

#### get_almanac_contract [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L488)

```python
def get_almanac_contract(test: bool = True) -> Optional[AlmanacContract]
```

Get the AlmanacContract instance.

**Arguments**:

- `test` _bool_ - Whether to use the testnet or mainnet. Defaults to True.

**Returns**:

- `AlmanacContract` - The AlmanacContract instance if version is supported.

## NameServiceContract Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L507)

```python
class NameServiceContract(LedgerContract)
```

A class representing the NameService contract for managing domain names and ownership.

This class provides methods to interact with the NameService contract, including
checking name availability, checking ownership, querying domain public status,
obtaining registration transaction details, and registering a name within a domain.

#### query_contract [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L516)

```python
def query_contract(query_msg: Dict[str, Any]) -> Any
```

Execute a query with additional checks and error handling.

**Arguments**:

- `query_msg` _Dict[str, Any]_ - The query message.

**Returns**:

- `Any` - The query response.

**Raises**:

- `RuntimeError` - If the contract address is not set or the query fails.

#### is_name_available [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L538)

```python
def is_name_available(name: str, domain: str) -> bool
```

Check if a name is available within a domain.

**Arguments**:

- `name` _str_ - The name to check.
- `domain` _str_ - The domain to check within.

**Returns**:

- `bool` - True if the name is available, False otherwise.

#### is_owner [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L552)

```python
def is_owner(name: str, domain: str, wallet_address: str) -> bool
```

Check if the provided wallet address is the owner of a name within a domain.

**Arguments**:

- `name` _str_ - The name to check ownership for.
- `domain` _str_ - The domain to check within.
- `wallet_address` _str_ - The wallet address to check ownership against.

**Returns**:

- `bool` - True if the wallet address is the owner, False otherwise.

#### is_domain_public [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L573)

```python
def is_domain_public(domain: str) -> bool
```

Check if a domain is public.

**Arguments**:

- `domain` _str_ - The domain to check.

**Returns**:

- `bool` - True if the domain is public, False otherwise.

#### get_previous_records [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L590)

```python
def get_previous_records(name: str, domain: str)
```

Retrieve the previous records for a given name within a specified domain.

**Arguments**:

- `name` _str_ - The name whose records are to be retrieved.
- `domain` _str_ - The domain within which the name is registered.

**Returns**:

A list of dictionaries, where each dictionary contains
details of a record associated with the given name.

#### get_registration_tx [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L608)

```python
def get_registration_tx(name: str, wallet_address: Address,
                        agent_records: Union[List[Dict[str, Any]],
                                             str], domain: str, test: bool)
```

Get the registration transaction for registering a name within a domain.

**Arguments**:

- `name` _str_ - The name to be registered.
- `wallet_address` _str_ - The wallet address initiating the registration.
- `agent_address` _str_ - The address of the agent.
- `domain` _str_ - The domain in which the name is registered.
- `test` _bool_ - The agent type

**Returns**:

- `Optional[Transaction]` - The registration transaction, or None if the name is not
  available or not owned by the wallet address.

#### register [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L666)

```python
async def register(ledger: LedgerClient,
                   wallet: LocalWallet,
                   agent_records: Optional[Union[str, List[str], Dict[str,
                                                                      dict]]],
                   name: str,
                   domain: str,
                   overwrite: bool = True)
```

Register a name within a domain using the NameService contract.

**Arguments**:

- `ledger` _LedgerClient_ - The Ledger client.
- `wallet` _LocalWallet_ - The wallet of the agent.
- `agent_address` _str_ - The address of the agent.
- `name` _str_ - The name to be registered.
- `domain` _str_ - The domain in which the name is registered.
- `overwrite` _bool, optional_ - Specifies whether to overwrite any existing
  addresses registered to the domain. If False, the address will be
  appended to the previous records. Defaults to True.

#### unregister [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L741)

```python
async def unregister(name: str, domain: str, wallet: LocalWallet)
```

Unregister a name within a domain using the NameService contract.

**Arguments**:

- `name` _str_ - The name to be unregistered.
- `domain` _str_ - The domain in which the name is registered.
- `wallet` _LocalWallet_ - The wallet of the agent.

#### get_name_service_contract [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/network.py#L779)

```python
def get_name_service_contract(test: bool = True) -> NameServiceContract
```

Get the NameServiceContract instance.

**Arguments**:

- `test` _bool_ - Whether to use the testnet or mainnet. Defaults to True.

**Returns**:

- `NameServiceContract` - The NameServiceContract instance.
