# Almanac Contract

μAgents participating in any system are required to register in the **Almanac contract**. The Almanac is a smart contract developed and deployed on the Fetch.ai blockchain which provides users with a direct way to query a particular μAgent's information, as well as allowing other agents to retrieve information about any specific μAgents registered within the contract. Thus, _μAgents registration in the Almanac contract is a key part for agents to communicate in a remote way_.

The system employs strict time limitations for registrations, measured in **blocks**, to ensure the smooth operation of a large ecosystem of agents. This limitation addresses the liveness problem by encouraging μAgents to periodically re-register their information within the Almanac contract, thus keeping the registration details up to date for each one of them.

Indeed, once a μAgent's registration information expires due to the time limit, queries for that μAgents will no longer return the previously registered information. This mechanism promotes the accuracy and relevance of the μAgents information available to others.

During each registration process, μAgents must prove ownership of their address. This is achieved by signing a sequence number using their μAgent private key and subsequently submitting the signature to the contract for verification. The sequence number should increment with each successful registration and can also be queried. These steps are automated, ensuring a streamlined registration experience for μAgents.

By implementing these measures, the system _guarantees_ that:

- μAgents are registered in the Almanac contract.
- Users can query registered agent information.
- Registration is up-to-date.
- Ownership of μAgents addresses is verified through signature verification.
