# src.uagents.config

#### parse_endpoint_config [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/config.py#L46)

```python
def parse_endpoint_config(
    endpoint: Optional[Union[str, List[str], Dict[str, dict]]]
) -> List[AgentEndpoint]
```

Parse the user-provided endpoint configuration.

**Returns**:

Optional[List[Dict[str, Any]]]: The parsed endpoint configuration.

#### parse_agentverse_config [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/config.py#L73)

```python
def parse_agentverse_config(
    config: Optional[Union[str, Dict[str, str]]] = None
) -> Dict[str, Union[str, bool, None]]
```

Parse the user-provided agentverse configuration.

**Returns**:

Dict[str, Union[str, bool, None]]: The parsed agentverse configuration.
