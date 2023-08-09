# Exchange protocol

## Overview

The **μAgents Exchange Protocol** is a protocol designed as part of the Fetch.ai μAgents Framework. It defines a standardized method for communication between μAgents within the μAgents ecosystem.

The Exchange protocol enables μAgents to exchange **messages** using a JSON-based format, which are structured as key-value pairs following the JSON standard. Messages can contain various types of information and are used to convey data and instructions between agents.

 Within the protocol, **envelopes** facilitate communication by encapsulating messages. Envelopes serve as containers for the messages and include additional metadata.

In this protocol, μAgents can send **messages** enclosed in **envelopes**, which are then encoded and sent via HTTP to the [endpoints ↗️](/references/contracts/uagents-almanac/endpoints.md) of other μAgents.

By adhering to the μAgents Exchange Protocol, agents within the Fetch.ai μAgents ecosystem can communicate with each other using a standardized and interoperable method. _The protocol establishes a common format and structure for messages, enabling seamless interaction and integration between different μAgents and services._

We break down each of these concepts in more detail below.

## Core concepts
### Messages

Messages consist of key-value pairs following the standard JSON format.

Here are a few examples:

```json
{"message": "hello"}
```
```json
{"name": "alice", "age": 26, "languages": ["English", "Japanese", "Arabic"]}
```
```json
{"item": "pretzel", "bid": {"amount": 120, "denomination": "GBP"}}
```

Once messages are created, these are enclosed in envelopes containing some important metadata.

### Envelopes

Envelopes have the following form and are quite similar to blockchain transactions:

```python
@dataclass
class Envelope:
    sender: str:    # bech32-encoded public address
    target: str:    # bech32-encoded public address
    session: str    # UUID
    protocol: str   # protocol digest
    payload: bytes  # JSON type: base64 str
	expires: int    # Unix timestamp in seconds
    signature: str  # bech32-encoded signature
```

### Semantics

- The **sender** field exposes the address of the sender of the message. 
- The **target** field exposes the address of the recipient of the message. 
- The **protocol** contains the unique schema digest string for the message. 
- The **payload** field exposes the payload of the protocol. Its JSON representation should be a base64 encoded string. 
- The **expires** field contains the Unix timestamp in seconds at which the message is no longer valid. 
- The **signature** field contains the signature that is used to authenticate that the message has been sent from the **sender** agent.

Envelopes are then JSON encoded and sent to endpoints of other μAgents or services.

### Endpoints

The protocol supports only one standardised endpoint: ```HTTP 1.1 POST /submit```, and expects data which is broadly JSON compatible. 

The protocol currently supports MIME content type `application/json`.
