# Accessibility

The React docs are a good starting point for Accessiblity in React:

[React Docs: Accessibility](https://reactjs.org/docs/accessibility.html)

## Linting

[ESLint](https://eslint.org/) is a linter utility for JavaScript.

We are using the [ESLint jsx-a11y extension](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) to catch accessibility issues.

Use the repository above to search for the meaning of the warnings. The links in there will guide you to the relevant underlying W3C and other resources.

Run ESLint on Volto with:

`yarn lint`

This command will return any accessiblity violations that the jsx-a11y extension catches.

### Linting In VSCode

We recommend that you install an eslint plugin in your favorite IDE.

For Visual Studio Code, install the [vscode-eslint](https://github.com/Microsoft/vscode-eslint) Plugin.
