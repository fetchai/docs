# src.uagents.mailbox

## MailboxClient Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L19)

```python
class MailboxClient()
```

Client for interacting with the Agentverse mailbox server.

#### base_url [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L29)

```python
@property
def base_url()
```

Property to access the base url of the mailbox server.

Returns: The base url of the mailbox server.

#### agent_mailbox_key [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L39)

```python
@property
def agent_mailbox_key()
```

Property to access the agent_mailbox_key of the mailbox server.

Returns: The agent_mailbox_key of the mailbox server.

#### protocol [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L48)

```python
@property
def protocol()
```

Property to access the protocol of the mailbox server.

Returns: The protocol of the mailbox server {ws, wss, http, https}.

#### http_prefix [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L57)

```python
@property
def http_prefix()
```

Property to access the http prefix of the mailbox server.

Returns: The http prefix of the mailbox server {http, https}.

#### run [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L66)

```python
async def run()
```

Runs the mailbox client.

#### start_polling [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L74)

```python
async def start_polling()
```

Runs the mailbox client. Acquires an access token if needed and then starts a polling loop.

#### process_deletion_queue [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/mailbox.py#L126)

```python
async def process_deletion_queue()
```

Processes the deletion queue. Deletes envelopes from the mailbox server.
