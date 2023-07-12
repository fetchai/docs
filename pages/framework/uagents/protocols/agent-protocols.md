# μAgents protocols

The μAgents framework supports capturing related message types and handlers in **protocols**. Protocols are used to facilitate communication and interaction between μAgents in the μAgents framework. Any μAgent including the same protocol will be able to communicate with each other.

A **protocol** is built similar to a **μAgents**, but it has no identity and cannot be run. It contains only the message types and handlers that define some components of μAgents functionality.

To show how protocols work, let's consider the **[Restaurant Booking Table Demo](booking-table-demo.md)**.
