# Linting

!!! note
    This documentation is a work in progress. Any help is welcome to fill in the
    gaps!

Volto developers can enjoy a lot of freedom in their choice of text editors and
IDEs, thanks to the strong tooling provided by the Javascript ecosystem.

At the core of these capabilities is ESLint, the advanced javascript linting
and formatting tool. Also included with Volto is integration with Stylelint and
Prettier.

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
