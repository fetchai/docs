# Development Guidelines

- [Getting the Source](#get)
- [Development](#dev)
- [Contributing](#contributing)

## <a name="get"></a> Getting the Source

<!-- markdown-link-check-disable -->

1. Fork the [repository](https://github.com/fetchai/docs.git).
2. Clone your fork of the repository:
    <!-- markdown-link-check-enable -->

   ```shell
   git clone https://github.com/fetchai/docs.git
   ```

3. Define an `upstream` remote pointing back to the main repository:

   ```shell
   git remote add upstream https://github.com/fetchai/docs.git
   ```

## <a name="dev"></a> Development

Install dependencies:

```bash
pnpm install
```

Run Development Server

```bash
pnpm dev
```

The site is then visible at:

<!-- markdown-link-check-disable -->

http://127.0.0.1:3000/docs

<!-- markdown-link-check-enable -->

## <a name="contributing"></a>Contributing

<!-- markdown-link-check-disable -->

For instructions on how to contribute to the project (e.g. creating Pull Requests, commit message convention, etc), see the [contributing guide](CONTRIBUTING.md).

<!-- markdown-link-check-enable -->
