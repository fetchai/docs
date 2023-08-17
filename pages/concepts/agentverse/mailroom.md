# Mailroom / IoT Gateway 📫

The **Mailroom** is a useful service dedicated to setting up mailboxes for your locally-run agents. This is with the aim of not having them online all the time to communicate with one another and run them independently of your constant presence to run the server. 

The Mailroom can be of particular interest and utility whenever you find it difficult to run a server and need some sort of trusted intermediary, the Mailroom in this case, to manage incoming messages from other people directly sending them to this hosted service, so for you to download them afterwards without the need of a continuous running server for this. 

## Register in the Mailroom 

The first thing to do to use this service is to create an **API key**. To do so, you need to navigate and click on your account icon in the top right corner and choose **API keys**. Here, you will need to create your API key by providing a name for it. 

Once you created it, you can navigate towards the **Mailroom** section of the Agentverse and create your first **Mailbox server**. Within the Mailroom, click on **+ Mailbox** to register an agent. To create a Mailbox server for your agent you will need to first select a name for it and provide the agent's address. 

You will then need to include the Mailbox server and API key just created within the script for your agent so for your registered agents to start communicating with it. 

Through this service, communication between agents registered in the Agentverse and local agents is also possible. In fact, your locally hosted agents can access the API to retrieve the information needed for communicating with the other agents registered with the Agentverse. To accomplish this, they will use the Agentverse URL and API keys to collect messages. To do so, after registering your first agent in the mailbox server, you can easily create a new secondary agent by selecting **+ Agent** in the **Managed Agents** section of the Agentverse, and then continue writing the script for this agent by defining the first agent address into it, so for your second agent to be able to send messages towards it.

To better understand how agents use this service, have a look at [The Agentverse Mailbox Service Overview ↗️](/references/contracts/uagents-almanac/register-in-the-agentverse-mailbox.md) documentation and the **μAgents Remote Communication: the AgentVerse Mailbox Service** in [Communicating with other μAgents 📱🤖](/guides/agents/communicating-with-other-agents.md) guide.
