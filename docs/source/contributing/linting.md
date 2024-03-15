---
myst:
  html_meta:
    "description": "Code linting in Volto"
    "property=og:description": "Code linting in Volto"
    "property=og:title": "Linting"
    "keywords": "Volto, Plone, frontend, React, lint"
---

# Linting

Volto developers can enjoy a lot of freedom in their choice of text editors and
IDEs, thanks to the strong tooling provided by the JavaScript ecosystem.

At the core of these capabilities is `ESLint`, the advanced JavaScript linting
and formatting tool. Also included with Volto is integration with `Stylelint` and
`Prettier`.

For Visual Studio Code you'll need to integrate an
[ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

For VIM you can use the [awesome ALE](https://github.com/dense-analysis/ale),
which provides out-of-the box integration with all the tooling provided by
Volto.

Use this checklist to make sure your editor integration is properly integrated,
most importantly for .js/jsx files:

- The editor should automatically flag syntax errors
- The editor should automatically flag unused imports
- The editor should automatically (and properly) flag imported modules that are not found
- The editor should provide automatic code formatting on save

## Linting Volto core
If you want to contribute to Volto core you need to perform several quality control tasks in order to ensure that you commits are not breaking the automated tests that Volto is performing on every commit.

The first step in the testing hierarchy is the performing of code linting.

Volto core should already perform these linting commands when commiting locally from the [husky](https://typicode.github.io/husky/get-started.html) integration, however if the the automated check doesn't happen when performing a commit or you want to get less information you can also run each linting task manually as you will learn how-to from the next section.

If you want to see exactly which linting commands are set to run after a commit have a look at the [.lintstagedrc](https://github.com/plone/volto/blob/main/.lintstagedrc) file from the Volto project [main](https://github.com/plone/volto/) GitHub branch.

Volto core performs linting using the following commands:
- eslint - For finding problems in the project's code files
- prettier - For uniform code formatting
- stylelint - For uniform style formatting

Although we can run the linting commands from the root of the project
it will be easier to run the commands only for Volto core within the Volto core folder:

  ```shell
    cd packages/volto
  ```

From here we will have access to the commands to check for errors and to fix them as well, and we will go through all of the previously enumerated commands in the following section

### Eslint, Prettier and Stylint

You can run the `eslint`, `prettier` and `stylelint` commands by running the following from the Volto package folder:

```shell
  pnpm lint 
  pnpm prettier
  pnpm stylelint
```

If we get any errors some of them can be solved automatically by running `"lint-command":fix`:

```shell
  pnpm lint:fix
  pnpm prettier:fix
  pnpm stylelint:fix
```

> **Note**:
The same commands can be found also in your Volto add-on projects as seen in the [package.json.tpl](https://github.com/plone/volto/blob/main/packages/generator-volto/generators/app/templates/package.json.tpl#L10) file.
>
> You will use similar commands to run the linting commands using `yarn`:

```shell
  yarn lint
  yarn lint:fix
  yarn prettier
  yarn prettier:fix
  yarn stylelint
  yarn stylelint:fix
```

If the fix commands cannot fix the errors given by the linting commands you will need to fix the errors manually otherwise the commit will fail the testing infrastructure. If that happens your contribution will not be able to be merged until the pull request has every test passing.