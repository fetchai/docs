

# src.uagents.crypto.__init__



## Identity Objects [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L73)

```python
class Identity()
```

An identity is a cryptographic keypair that can be used to sign messages.



#### __init__ [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L76)
```python
def __init__(signing_key: ecdsa.SigningKey)
```

Create a new identity from a signing key.



#### from_seed [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L85)
```python
@staticmethod
def from_seed(seed: str, index: int) -> "Identity"
```

Create a new identity from a seed and index.



#### generate [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L96)
```python
@staticmethod
def generate() -> "Identity"
```

Generate a random new identity.



#### from_string [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L105)
```python
@staticmethod
def from_string(private_key_hex: str) -> "Identity"
```

Create a new identity from a private key.



#### private_key [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L118)
```python
@property
def private_key() -> str
```

Property to access the private key of the identity.



#### address [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L123)
```python
@property
def address() -> str
```

Property to access the address of the identity.



#### sign [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L132)
```python
def sign(data: bytes) -> str
```

Sign the provided data.



#### sign_digest [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L140)
```python
def sign_digest(digest: bytes) -> str
```

Sign the provided digest.



#### sign_registration [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L144)
```python
def sign_registration(contract_address: str, timestamp: int,
                      wallet_address: str) -> str
```

Sign the registration data for the Almanac contract.



#### verify_digest [↗](https://github.com/fetchai/uAgents/blob/main/python/src/uagents/crypto/__init__.py#L190)
```python
@staticmethod
def verify_digest(address: str, digest: bytes, signature: str) -> bool
```

Verify that the signature is correct for the provided signer address and digest.
