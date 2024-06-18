# broken link detection wip

Slow and hungry, query first (and multiple times) approach to searching for broken links using recursion. 

This is horribly inefficient, returns a list of broken links on the site and the page that they originate from. 
Takes about 10 minutes to run, eugh. 

Due to how this is working, it requires getting web content of the page before searching for links. No pages are 
stored, meaning we do this GET many times. GETs are slow, but then so is io to/from files. We could GET a page, then 
GET on the very first link, then GET on that pages next link, etc. Greeeedy/bad.

We could parse the html of the successful GET in the recursive loop which would speed this up a lot. Something to 
come back to.

### running script 

`poetry install`

`poetry run python broken_links.py`

Make a cuppa.

Outputs: 

```
http://localhost:3000/docs/guides/agents/advanced/dialogues#instantiate-dialogues-and-defining-continue-dialogue-handler:http://localhost:3000/docs/guides/examples/open-dialogue-chitchat#step-1-define-the-dialogue-structure
http://localhost:3000/docs/references/uagents/uagents-protocols/storage:http://localhost:3000/docs/guides/agents/cleaning-demo
http://localhost:3000/docs/references/uagents:http://localhost:3000/docs/guides/agents/cleaning-demo
http://localhost:3000/docs/references/uagents:http://localhost:3000/docs/guides/agents/uagents-name-service

```

Originating page : broken link
