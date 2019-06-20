# Accessibility

The React docs are a very good starging point for Accessiblity in React:

[React Docs: Accessibility](https://reactjs.org/docs/accessibility.html)

## Linting

[ESLint](https://eslint.org/) is a linter utility for JavaScript.

We are using the [ESLint jsx-a11y extension](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) to catch accessibility issues.

Run ESLint on Volto with:

```yarn lint```

This command will return any accessiblity violations that the jsx-a11y extension catches.

### Liniting in VSCode

We recommend that you install an eslint plugin in your favorite IDE.

For Visual Studio Code, install the [vscode-eslint]( https://github.com/Microsoft/vscode-eslint) Plugin.
