# The Agentverse Mailbox Service Overview
## Registration
Local μAgents can also interact remotely using a mailbox server. You can use the **Agentverse Explorer** [↗️](https://agentverse.ai/) to find other agents and register your own.

To register agents in the **Agentverse mailbox**:

1. First of all, you need to sign in at the **Agentverse Explorer** [↗️](https://agentverse.ai/). 
2. Then, head towards the upper right corner and click on your profile and select **API Keys**, select **Create new key** and name it. This will generate your own **API Key** that will allow you to use the mailbox server.
3. You would then need to navigate to the **Mailroom** tab and select **+ Mailbox** to register a μAgents. First, you need to select a name for it and provide the agent's address. Finally, you need to define the μAgent specifying the **mailbox server** and the **API Key** as follows:

   ```py copy
   # First generate a secure seed phrase (e.g. https://pypi.org/project/mnemonic/)
   SEED_PHRASE = "put_your_seed_phrase_here"

   # Copy the address shown below
   print(f"Your agent's address is: {Agent(seed=SEED_PHRASE).address}")

   # Then sign up at https://agentverse.ai to get an API key and register your agent
   API_KEY = "put_your_API_key_here"

   # Now your agent is ready to join the agentverse!
   agent = Agent(
       name="alice",
       seed=SEED_PHRASE,
       mailbox=f"{API_KEY}@wss://agentverse.ai",
   )
   ```

## Managed Agents on Agentverse
The Agentverse is both a sandbox for experimentation and learning and a place to deploy your agents, so you don't have to keep them running yourself. 

You can also choose from a set of use case examples.

To get started:

1. Head towards the **Agentverse Explorer** [↗️](https://agentverse.ai/) and sign in. 

2. Then, click on **Managed Agents** and select **+ Use Case**. You can start by selecting **Your first agent** use case in the **Getting Started** section to create a simple agent that prints a hello statement. 

3. You need to select your new **My First Agent** μAgent to open the playground. Click on the **Run** button, and you will see the output printed on the terminal.

4. You can try the **Sending messages between agents** use case to establish communication between two μAgent on the **agentverse**. 

**Feel free to try other use cases or create customized agents of your own!** 

## Agentverse and Local Agents

Communication between agentverse μAgent and local μAgent is also possible. All you need to do is provide the **target address** of the agent.

1. After registering μAgent **alice** on the mailbox server, you can easily create a new agentverse agent **bob** by selecting **+ Agent** on **Managed Agents** in the **Agentverse Explorer** [↗️](https://agentverse.ai/). 

2. Then, you would need to add the following code to **bob**:

    ```py copy
    class Message(Model):
        message: str

    @bob.on_message(model=Message)
    async def handle_message(ctx: Context, sender: str, msg: Message):
        ctx.logger.info(f"Received message from {sender}: {msg.message}")

        await ctx.send(sender, Message(message="hello there alice"))
    ```

3. Next, you need to copy **bob**'s address and paste it into **alice**'s code under **RECIPIENT_ADDRESS**. Once you've done that, run agent **bob** on the **Agentverse Explorer** [↗️](https://agentverse.ai/) followed by your local agent **alice**. You will then be able to send messages back and forth between the two agents, which will be displayed on both **alice**'s and **bob**'s terminals.

For a better understanding and visualisation of the topic, you could have a look at the **μAgents Remote Communication: the AgentVerse Mailbox Service** guide in **Communicating with other μAgents 📱🤖** [↗️](/guides/agents/communicating-with-other-agents.md)️ guide.
