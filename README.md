# Fetch.ai Documentation Repo

## Updating docs

### Creating docs for fetch.ai employees:

Select the appropriate route, and create a new file ending in `.mdx`. Then, update the `_meta.json` at the same level as the created file. You'll need to add your newly created page to the meta file like below:

```
{
  "example": {
    "title": "example page for employees",
    "permission": ["fetch.ai"]
  }
}
```

## Deployments

### Staging Website

https://docs-staging.sandbox-london-b.fetch-ai.com/docs



## Developing

### Install dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

The site is then visible at:

http://127.0.0.1:3000/docs

### Production Build Workflow

Build the codebase

```bash
pnpm build
```

Run the production server

```bash
pnpm start
```

The site is then visible at:

http://127.0.0.1:3000/docs


## Updating Alogolia Search

In root of directory run: `node index-data-to-algolia.mjs`
You will need to have API key, please update the file to have a new index.

The update `theme/fetch-ai-docs/components/instant-algolia-search.tsx` var `indexName` to be the name of the index 
you're creating in the step before.