# Volto Commit Messages

Volto uses the (conventional commit specification)[https://www.conventionalcommits.org/en/v1.0.0/#specification] for consistent commit messages.

All commit messages should have the following form:

````
<type>: <description>
````

## Fix

A fix (PATCH in semantic versioning) looks like this:

````
fix: correct minor typos in code
````

## Feature

A new feature (MINOR in semantic versioning) looks like this:

````
feat: add catalan language
````

## Breaking Change

Breaking changes can be indicated by either appending a "!" to the type:

````
refactor!: drop support for Node 6
````

Or adding "BREAKING CHANGE" to the commit message body text:

````
refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
````

## Available Types

In addition to "fix" and "feat" the following types are allowed:
build:, chore:, ci:, docs:, style:, refactor:, perf:, test:



Install commitlint:

````
npm install --save-dev @commitlint/{config-conventional,cli}
````

or via yarn:

````
yarn add @commitlint/{config-conventional,cli}
````

Create a commitlint.config.js file:

````
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
````

Add husky to package.json:

````
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }  
  }
}
````