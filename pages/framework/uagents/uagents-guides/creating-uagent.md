# How to build μAgents
## Requirements

- Satisfy the [system requirements](system-requirements.md).
- Install a text editor application (e.g., [PyCharm CE](https://www.jetbrains.com/pycharm/download/) or [VisualStudioCode](https://code.visualstudio.com/download)).

## Walk-through

1. Open your command prompt (for Windows users) or terminal (for MacOS users).
2. Navigate towards the directory created for the project within which you have installed the μAgents Framework. 
3. Create a Python script within this directory: `touch name_of_script.py`
4. On the text editor, open this script. It will contain all code needed for your μAgents to run correctly.
5. You need to import the necessary classes **Agent** and **Context** from the **uagents** library. 

    ``` py
    from uagents import Agent, Context
    ```

    The **Agent** class represents an autonomous μAgent capable of making decisions, executing behaviors, and interacting with other agents in a decentralized fashion, whereas, the **Context** class provides μAgents with information about their environment and facilitates interactions between μAgents.

6. Create an instance of the **Agent** class, which represents our μAgent. 

    ``` py
    alice = Agent(name="alice", seed="alice recovery phrase")
    ```

    The μAgent is assigned a **name** and a **seed**. This latter one parameter is optional but needed to set fixed addresses. Otherwise, random addresses will be generated every time you run the agent.

7. Assign the μAgent a behavior to be executed. For instance, **alice** agent could send a message to itself every 2 seconds saying hello.

    ``` py
    @alice.on_interval(period=2.0)
    async def say_hello(ctx: Context):
        ctx.logger.info(f'hello, my name is {ctx.name}')
    
    if __name__ == "__main__":
        alice.run()
    ```

    Within the μAgents Framework, _decorators are used to run periodic actions_ (e.g., sending a message periodically), or to run an action based on a specific event happening (e.g., when a message is being received). 

    The μAgent runs a **say_hello()** function to send a message periodically every **2.0** seconds, to log a message with the name provided in the **ctx** object, **alice**. The agent then uses the **ctx.logger.info()** method to print the content of such a message on your terminal, that is: **hello my name is alice**. 

8. Save the .py script on the text editor and go back to the terminal or command prompt. 
9. Activate the virtual environment.
10. Run the script: `python name_of_script.py`

**Congratulations, you have successfully created your first μAgent!** 
