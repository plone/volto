---
myst:
  html_meta:
    "description": "Learn how to enable TypeScript support when developing you project with Volto."
    "property=og:description": "Learn how to enable TypeScript support when developing you project with Volto."
    "property=og:title": "TypeScript"
    "keywords": "Volto, Plone, frontend, React, typescript, css"
---

# TypeScript

```{versionadded} 17.0.0-alpha.27
```

TypeScript support has been added to Volto core.
ESlint has been configured in order to accept code base written both in JavaScript and in TypeScript.
TypeScript in projects and add-ons has been supported since Volto 14.
It is now supported in the project generator by default.


(typescript-policy-in-core-label)=

## TypeScript policy in core

The internal policy for TypeScript support in Volto core will be as follows.

-   No existing code has been migrated.
    Volto 17.0.0 has no TypeScript code present.
    Only *support* for TypeScript has been added.
-   Code in core can be written in either JavaScript or TypeScript, or both.
-   You are not forced to migrate existing code to TypeScript.
    It's your choice which one to use.
-   If you need to backport code to a version of Volto before 17.0.0, you must make the code compatible without TypeScript.

## TypeScript learning resources

-   [TypeScript Official Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

-   [TotalTypeScript React with TypeScript Free course](https://www.totaltypescript.com/tutorials/react-with-typescript)

-   [TotalTypeScript Beginner's TypeScript Free course](https://www.totaltypescript.com/tutorials/beginners-typescript)

## TypeScript in projects and add-ons

TypeScript is enabled by default in both projects and add-ons, and you can already start using TypeScript in it.

### Enable it in your Volto 17 project

If you already use Volto 17 in your projects, using a boilerplate generated before Volto 17.0.0-alpha.27 and the generator 7.0.0-alpha.7, you can enable TypeScript support as follows.

Edit your {file}`package.json` to align with that in the Volto repo.
You will need to modify [`lint` in the scripts section](https://github.com/plone/volto/blob/17.x.x/packages/generator-volto/generators/app/templates/package.json.tpl#L10-L12) and the [`devDependencies` section](https://github.com/plone/volto/blob/17.x.x/packages/generator-volto/generators/app/templates/package.json.tpl#L139-L161).

```{note}
After making this change, you might experience hoisting problems and some packages can't be found on start.
In that case, make sure you reset your `yarn.lock` by deleting it and start with a clean environment.
```

To use TypeScript in your projects, you'll need to introduce a TypeScript configuration file {file}`tsconfig.json`, and remove the existing file {file}`jsconfig.json`.
You can use the one provided by the generator as a template, or use your own:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "commonjs",
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {},
    "baseUrl": "src"
  },
  "include": ["src"],
  "exclude": [
    "node_modules",
    "build",
    "public",
    "coverage",
    "src/**/*.test.{js,jsx,ts,tsx}",
    "src/**/*.spec.{js,jsx,ts,tsx}",
    "src/**/*.stories.{js,jsx,ts,tsx}"
  ]
}
```

If you use `mrs-developer` in your project, update the command in {file}`Makefile`:

```diff
--- a/Makefile
+++ b/Makefile
@@ -59,7 +59,8 @@ preinstall: ## Preinstall task, checks if missdev (mrs-developer) is present and runs it

 .PHONY: develop
 develop: ## Runs missdev in the local project (mrs.developer.json should be present)
-       npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https
+       if [ -f $$(pwd)/jsconfig.json ]; then npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https; fi
+       if [ ! -f $$(pwd)/jsconfig.json ]; then npx -p mrs-developer missdev --output=addons --fetch-https; fi
```

````{note}
After editing your {file}`Makefile`, run `mrs-developer` with the following command, so the configuration gets in the right place ({file}`tsconfig.json`).
```shell
make develop
```
````

### Enable it in a project not using Volto 17 yet

To use TypeScript for an existing project in Volto versions 14.x-16.x, you need to install these additional dependencies in your project:

```shell
yarn add --dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/react @types/react-dom concurrently
```

Razzle supports TypeScript by default if you just use it, but all it does is transpile it to JavaScript with Babel in order to build it properly.
When used this way, TypeScript is actually ignored by your build pipeline, it is only checked by your editor, if capable of doing it on its own.
See more about this topic here: [https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html).

If you want to configure your build pipeline properly and your editor in a way that is consistent with your build tooling, there a few more configuration files you will need to tweak.

First of all, you need to rename your ``jsconfig.json`` file to ``tsconfig.json`` and add TypeScript configuration to the Volto configuration you already have.
A basic example of a working ``tsconfig.json`` file is:

```json
{
  "include": ["src"],
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {},
    "baseUrl": "src"
  }
}
```

Now that you have configured TypeScript, you just need to run it alongside Razzle in order to typecheck your code and block the production build if it has any problems.
Change your scripts in your ``package.json`` like this (inspired by [https://github.com/jaredpalmer/razzle/blob/master/examples/with-typescript/package.json](https://github.com/jaredpalmer/razzle/blob/master/examples/with-typescript/package.json)):

```json hl_lines="2 3 7 8 9 10 17"
"scripts": {
  "start:tsc": "tsc -b -w --preserveWatchOutput",
  "start": "concurrently \"yarn start:tsc\" \"razzle start\"",
  "postinstall": "yarn omelette && yarn patches",
  "omelette": "ln -sf node_modules/@plone/volto/ omelette",
  "patches": "/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true",
  "build": "tsc -b && razzle build",
  "lint": "./node_modules/eslint/bin/eslint.js 'src/**/*.{js,jsx,ts,tsx}'",
  "lint:fix": "./node_modules/eslint/bin/eslint.js --fix 'src/**/*.{js,jsx,ts,tsx}'",
  "lint:ci": "./node_modules/eslint/bin/eslint.js -f checkstyle 'src/**/*.{js,jsx,ts,tsx}' > eslint.xml",
  "prettier": "./node_modules/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
  "prettier:fix": "./node_modules/.bin/prettier --single-quote --write 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
  "prettier:ci": "./node_modules/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
  "test": "razzle test --passWithNoTests",
  "start:prod": "NODE_ENV=production node build/server.js",
  "i18n": "rm -rf build/messages && NODE_ENV=production i18n",
  "develop": "missdev --output=addons --fetch-https"
}
```

Note that if you are using ``mrs-developer`` to handle add-on development, it will work with this new configuration file as well, you just need to change your scripts in your ``package.json`` removing the ``--config`` option like this, since it looks for ``tsconfig.json`` by default:

You will also need to tweak ESLint to use the proper parser and extend the newly installed configuration.
Change your ``.eslintrc.js`` file along these lines:

```js hl_lines="2 3 4 5 6 7 8"
module.exports = {
  extends: [
    `${voltoPath}/.eslintrc`,
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', '@plone/volto/src'],
          ...addonAliases,
          ['@package', `${__dirname}/src`],
          ['@root', `${__dirname}/src`],
          ['~', `${__dirname}/src`],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};
```

Your editor should be properly reporting errors now, it should also be consistent with errors returned by the TypeScript compiler in the console during development.

## CSS Modules

If you are using CSS Modules in your code, instead of keeping all the styles in the main ``theme`` folder, you will see the typechecking failing because it does not recognize the modules you are importing with, for example, ``import styles from './styles.module.css'``.

Add a declaration file in your ``src`` folder to teach TypeScript about CSS Modules. As a basic working example, you can add the following file in your code at the path ``src/cssmodules.d.ts`` (inspired by [https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/lib/react-app.d.ts](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/lib/react-app.d.ts)):

```ts
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [className: string]: string };
  export default classes;
}
```
