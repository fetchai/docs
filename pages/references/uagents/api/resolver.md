# src.uagents.resolver

Endpoint Resolver.

#### weighted_random_sample [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L27)

```python
def weighted_random_sample(items: List[Any],
                           weights: Optional[List[float]] = None,
                           k: int = 1,
                           rng=random) -> List[Any]
```

Weighted random sample from a list of items without replacement.

Ref: Efraimidis, Pavlos S. "Weighted random sampling over data streams."

**Arguments**:

- `items` _List[Any]_ - The list of items to sample from.
- `weights` _Optional[List[float]]_ - The optional list of weights for each item.
- `k` _int_ - The number of items to sample.
- `rng` _random_ - The random number generator.

**Returns**:

- `List[Any]` - The sampled items.

#### is_valid_address [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L51)

```python
def is_valid_address(address: str) -> bool
```

Check if the given string is a valid address.

**Arguments**:

- `address` _str_ - The address to be checked.

**Returns**:

- `bool` - True if the address is valid; False otherwise.

#### is_valid_prefix [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L66)

```python
def is_valid_prefix(prefix: str) -> bool
```

Check if the given string is a valid prefix.

**Arguments**:

- `prefix` _str_ - The prefix to be checked.

**Returns**:

- `bool` - True if the prefix is valid; False otherwise.

#### parse_identifier [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L80)

```python
def parse_identifier(identifier: str) -> Tuple[str, str, str]
```

Parse an agent identifier string into prefix, name, and address.

**Arguments**:

- `identifier` _str_ - The identifier string to be parsed.

**Returns**:

Tuple[str, str, str]: A tuple containing the prefix, name, and address as strings.

#### query_record [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L109)

```python
def query_record(agent_address: str, service: str, test: bool) -> dict
```

Query a record from the Almanac contract.

**Arguments**:

- `agent_address` _str_ - The address of the agent.
- `service` _str_ - The type of service to query.

**Returns**:

- `dict` - The query result.

#### get_agent_address [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L128)

```python
def get_agent_address(name: str, test: bool) -> Optional[str]
```

Get the agent address associated with the provided name from the name service contract.

**Arguments**:

- `name` _str_ - The name to query.
- `test` _bool_ - Whether to use the testnet or mainnet contract.

**Returns**:

- `Optional[str]` - The associated agent address if found.

## Resolver Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L154)

```python
class Resolver(ABC)
```

#### resolve [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L155)

```python
@abstractmethod
async def resolve(destination: str) -> Tuple[Optional[str], List[str]]
```

Resolve the destination to an address and endpoint.

**Arguments**:

- `destination` _str_ - The destination name or address to resolve.

**Returns**:

Tuple[Optional[str], List[str]]: The address (if available) and resolved endpoints.

## GlobalResolver Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L170)

```python
class GlobalResolver(Resolver)
```

#### **init** [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L171)

```python
def __init__(max_endpoints: Optional[int] = None,
             almanac_api_url: Optional[str] = None)
```

Initialize the GlobalResolver.

**Arguments**:

- `max_endpoints` _Optional[int]_ - The maximum number of endpoints to return.
- `almanac_api_url` _Optional[str]_ - The url for almanac api

#### resolve [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L189)

```python
async def resolve(destination: str) -> Tuple[Optional[str], List[str]]
```

Resolve the destination using the appropriate resolver.

**Arguments**:

- `destination` _str_ - The destination name or address to resolve.

**Returns**:

Tuple[Optional[str], List[str]]: The address (if available) and resolved endpoints.

## AlmanacContractResolver Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L211)

```python
class AlmanacContractResolver(Resolver)
```

#### **init** [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L212)

```python
def __init__(max_endpoints: Optional[int] = None)
```

Initialize the AlmanacContractResolver.

**Arguments**:

- `max_endpoints` _Optional[int]_ - The maximum number of endpoints to return.

#### resolve [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L221)

```python
async def resolve(destination: str) -> Tuple[Optional[str], List[str]]
```

Resolve the destination using the Almanac contract.

**Arguments**:

- `destination` _str_ - The destination address to resolve.

**Returns**:

Tuple[str, List[str]]: The address and resolved endpoints.

## AlmanacApiResolver Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L252)

```python
class AlmanacApiResolver(Resolver)
```

#### **init** [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L253)

```python
def __init__(max_endpoints: Optional[int] = None,
             almanac_api_url: Optional[str] = None)
```

Initialize the AlmanacApiResolver.

**Arguments**:

- `max_endpoints` _Optional[int]_ - The maximum number of endpoints to return.
- `almanac_api_url` _Optional[str]_ - The url for almanac api

#### resolve [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L316)

```python
async def resolve(destination: str) -> Tuple[Optional[str], List[str]]
```

Resolve the destination using the Almanac API.
If the resolution using API fails, it retries using the Almanac Contract.

**Arguments**:

- `destination` _str_ - The destination address to resolve.

**Returns**:

Tuple[Optional[str], List[str]]: The address and resolved endpoints.

## NameServiceResolver Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L335)

```python
class NameServiceResolver(Resolver)
```

#### **init** [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L336)

```python
def __init__(max_endpoints: Optional[int] = None)
```

Initialize the NameServiceResolver.

**Arguments**:

- `max_endpoints` _Optional[int]_ - The maximum number of endpoints to return.

#### resolve [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L348)

```python
async def resolve(destination: str) -> Tuple[Optional[str], List[str]]
```

Resolve the destination using the NameService contract.

**Arguments**:

- `destination` _str_ - The destination name to resolve.

**Returns**:

Tuple[Optional[str], List[str]]: The address (if available) and resolved endpoints.

## RulesBasedResolver Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L366)

```python
class RulesBasedResolver(Resolver)
```

#### **init** [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L367)

```python
def __init__(rules: Dict[str, str], max_endpoints: Optional[int] = None)
```

Initialize the RulesBasedResolver with the provided rules.

**Arguments**:

- `rules` _Dict[str, str]_ - A dictionary of rules mapping destinations to endpoints.
- `max_endpoints` _Optional[int]_ - The maximum number of endpoints to return.

#### resolve [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/resolver.py#L378)

```python
async def resolve(destination: str) -> Tuple[Optional[str], List[str]]
```

Resolve the destination using the provided rules.

**Arguments**:

- `destination` _str_ - The destination to resolve.

**Returns**:

Tuple[str, List[str]]: The address and resolved endpoints.
