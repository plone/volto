---
myst:
  html_meta:
    "description": "Code linting in Volto"
    "property=og:description": "Code linting in Volto"
    "property=og:title": "Linting"
    "keywords": "Volto, Plone, frontend, React, lint"
---

# Linting

Volto developers can enjoy a lot of freedom in their choice of text editors and IDEs, thanks to the strong tooling provided by the JavaScript ecosystem.

Volto uses {term}`ESLint`, the advanced JavaScript linting and formatting tool, {term}`Stylelint`, and {term}`Prettier`.


## Editor integration

For Visual Studio Code, you'll need to install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

For Vim and NeoVim, you can use [Asynchronous Lint Engine (ALE)](https://github.com/dense-analysis/ale)
It provides out-of-the box integration with all the tooling provided by Volto.

PyCharm Professional includes [ESLint](https://www.jetbrains.com/help/pycharm/eslint.html), [Stylelint](https://www.jetbrains.com/help/pycharm/using-stylelint-code-quality-tool.html), and [Prettier](https://www.jetbrains.com/help/pycharm/prettier.html).

Use this checklist to make sure you have correctly configured your editor, most importantly for `.js` and `.jsx` files, the editor should automatically:

-  flag syntax errors
-  flag unused imports
-  properly flag imported modules that are not found
-  format code on save


## Lint Volto core

If you want to contribute to Volto core, you must perform several code quality control tasks.
Your commits must not break the automated tests, or {term}`GitHub workflows`, that Volto performs on every push or pull request.

Code linting is the first step in the testing hierarchy.

Volto core should automatically perform linting commands when you commit locally, as provided by the {term}`husky` integration.
However if the automated check doesn't happen when performing a commit, or you want to get less information, you can also run each linting task manually, as described in {ref}`linting-eslint-prettier-and-stylelint-label`.

If you want to see exactly which linting commands are set to run after a commit, look at the {file}`.lintstagedrc` at the root of the repository.

Volto core performs linting using the following commands:

`eslint`
:   For finding problems in the project's code files.

`prettier`
:   For uniform code formatting.

`stylelint`
:   For uniform style formatting.

Although we can run the linting commands from the root of the repository, it is easier to run the commands only for Volto core within the Volto core folder:

```shell
cd packages/volto
```

From here we will have access to the commands to check for errors and to fix them.

```{seealso}
{ref}`developing-core-run-commands-for-pnpm-workspaces-label`
```


(linting-eslint-prettier-and-stylelint-label)=

### Eslint, Prettier, and Stylelint

You can run the pnpm `eslint`, `prettier`, and `stylelint` commands from the Volto package folder:

```shell
pnpm lint 
pnpm prettier
pnpm stylelint
```

If we get any errors, some of them can be solved automatically by running pnpm commands as `<lint_command>:fix`:

```shell
pnpm lint:fix
pnpm prettier:fix
pnpm stylelint:fix
```

````{note}
The same commands can be found in your Volto add-on projects, as seen in the [`package.json.tpl`](https://github.com/plone/volto/blob/main/packages/generator-volto/generators/app/templates/package.json.tpl#L10) file.

You will use similar commands to run the linting commands, but with `yarn` instead of `pnpm`:

```shell
yarn lint
yarn lint:fix
yarn prettier
yarn prettier:fix
yarn stylelint
yarn stylelint:fix
```
````

```{important}
If the `fix` commands cannot fix the errors given by the linting commands, you will need to fix the errors manually.
Do not push commits that do not pass lint checks.
It will not pass GitHub workflow checks, and your contribution will not be merged.
```
