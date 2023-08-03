# Getting Started 

Welcome to CosmPy, the Python-based framework that will streamline your interactions with Cosmos SDK based blockchains. Whether you are a seasoned blockchain developer or just starting your journey into the world of decentralized systems, CosmPy offers unparalleled simplicity with respect to basic and advanced interactions. Developed by Fetch.ai, this powerful Python library opens the gateway to seamless communication, making it easier than ever to explore the endless possibilities of decentralized applications.

Throughout this guide, you'll learn how to install CosmPy on your local environment, connect it to a blockchain network, extract valuable data from the blockchain, and dive into the world of blockchain transactions, mastering the construction and signing process using CosmPy. By the end of this guide, you'll have a solid foundation in CosmPy and be well-equipped to integrate blockchain functionalities into existing projects or explore more advanced topics.

## Installation 
 
In order to install CosmPy ensure you have Python (version 3.8, 3.9 or 3.10) installed on your system. PIP is the preferred installer and it comes built in with Python installations older than 3.4. 

Once Python and PIP are installed, run the following command to install CosmPy 
```
pip install cosmpy 
```
Once installed we can verify the installation with the following command
```
pip show cosmpy
```
Once correctly installed you should see this output on the terminal 

```
Name: cosmpy
Version: 0.9.0
Summary: A library for interacting with the cosmos networks
Home-page: https://github.com/fetchai/cosmpy
Author: Fetch.AI Limited
Author-email:
License: Apache-2.0
Requires: bech32, ecdsa, grpcio, jsonschema, protobuf, pycryptodome, python-dateutil, requests

```