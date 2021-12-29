{
  "name": "<%= projectName %>",
  "description": "<%= projectDescription %>",
  "license": "MIT",
  "version": "1.0.0",
  "scripts": {
    "start": "razzle start",
    "preinstall": "if [ -f $(pwd)/mrs.developer.json ]; then if [ -f $(pwd)/node_modules/.bin/missdev ]; then yarn develop; else yarn develop:npx; fi; fi",
    "postinstall": "yarn omelette && yarn patches",
    "omelette": "ln -sf node_modules/@plone/volto/ omelette",
    "patches": "/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true",
    "build": "razzle build",
    "lint": "./node_modules/eslint/bin/eslint.js 'src/**/*.{js,jsx}'",
    "lint:fix": "./node_modules/eslint/bin/eslint.js --fix 'src/**/*.{js,jsx}'",
    "lint:ci": "./node_modules/eslint/bin/eslint.js -f checkstyle 'src/**/*.{js,jsx}' > eslint.xml",
    "prettier": "./node_modules/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
    "prettier:fix": "./node_modules/.bin/prettier --single-quote --write 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
    "prettier:ci": "./node_modules/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}'",
    "stylelint": "stylelint 'theme/**/*.{css,less}' 'src/**/*.{css,less}'",
    "stylelint:overrides": "stylelint 'theme/**/*.overrides' 'src/**/*.overrides'",
    "stylelint:fix": "yarn stylelint --fix && yarn stylelint:overrides --fix",
    "test": "razzle test --env=jest-environment-jsdom-sixteen --passWithNoTests",
    "cypress:run": "NODE_ENV=test cypress run",
    "cypress:open": "NODE_ENV=test cypress open",
    "cypress:start-frontend": "RAZZLE_API_PATH=http://localhost:55001/plone yarn start",
		"cypress:test-acceptance-server": "make test-acceptance-server",
		"cy:test:fixture:setup": "node cypress/support/reset-fixture.js",
		"cy:test:fixture:teardown": "node cypress/support/reset-fixture.js teardown",
    "ci:start-backend": "make start-test-backend",
    "ci:start-frontend": "RAZZLE_API_PATH=http://localhost:55001/plone yarn build && start-test start:prod http-get://localhost:3000 cypress:run",
    "ci:cypress:run": "start-test ci:start-backend http-get://localhost:55001/plone ci:start-frontend",
    "start:prod": "NODE_ENV=production node build/server.js",
    "i18n": "rm -rf build/messages && NODE_ENV=production i18n",
    "develop:npx": "npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https",
    "develop": "missdev --config=jsconfig.json --output=addons --fetch-https",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  },
  "private": <%- private %>,
  "workspaces": <%- workspaces %>,
  "addons": <%- addons %>,
  "jest": {
    "modulePathIgnorePatterns": [
      "api"
    ],
    "transform": {
      "^.+\\.js(x)?$": "babel-jest",
      "^.+\\.css$": "jest-css-modules",
      "^.+\\.scss$": "jest-css-modules",
      "^.+\\.(png)$": "jest-file",
      "^.+\\.(jpg)$": "jest-file",
      "^.+\\.(svg)$": "./node_modules/@plone/volto/jest-svgsystem-transform.js"
    },
    "transformIgnorePatterns": [
      "/node_modules/(?!@plone/volto).+\\.js$"
    ],
    "moduleNameMapper": {
      "@plone/volto/babel": "<rootDir>/node_modules/@plone/volto/babel",
      "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
      "load-volto-addons": "<rootDir>/node_modules/@plone/volto/jest-addons-loader.js",
      "@package/(.*)$": "<rootDir>/src/$1",
      "~/(.*)$": "<rootDir>/src/$1"
    },
    "coverageThreshold": {
      "global": {
        "branches": 10,
        "functions": 10,
        "lines": 10,
        "statements": 10
      }
    },
    "setupFiles": [
      "@plone/volto/test-setup-globals.js",
      "@plone/volto/test-setup-config.js"
    ],
    "globals": {
      "__DEV__": true
    }
  },
  "prettier": {
    "trailingComma": "all",
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.overrides",
        "options": {
          "parser": "less"
        }
      }
    ]
  },
  "stylelint": {
    "extends": [
      "stylelint-config-idiomatic-order"
    ],
    "plugins": [
      "stylelint-prettier"
    ],
    "overrides": [
      {
        "files": [
          "**/*.less"
        ],
        "customSyntax": "postcss-less"
      },
      {
        "files": [
          "**/*.overrides"
        ],
        "customSyntax": "postcss-less"
      }
    ],
    "rules": {
      "prettier/prettier": true,
      "rule-empty-line-before": [
        "always-multi-line",
        {
          "except": [
            "first-nested"
          ],
          "ignore": [
            "after-comment"
          ]
        }
      ]
    },
    "ignoreFiles": "theme/themes/default/**/*.overrides"
  },
  "browserslist": [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie 11",
    "not dead"
  ],
  "engines": {
    "node": "^12 || ^14 || ^16"
  },
  "dependencies": <%- dependencies %>,
  "devDependencies": {
    "eslint-plugin-prettier": "3.1.3",
    "jest-junit": "8.0.0",
    "mrs-developer": "*",
    "postcss": "8.3.11",
    "prettier": "2.0.5",
    "@storybook/addon-actions": "^6.3.0",
    "@storybook/addon-controls": "6.3.0",
    "@storybook/addon-essentials": "^6.3.0",
    "@storybook/addon-links": "^6.3.0",
    "@storybook/react": "^6.3.0",
    "stylelint": "14.0.1",
    "stylelint-config-idiomatic-order": "8.1.0",
    "stylelint-config-prettier": "8.0.1",
    "stylelint-prettier": "1.1.2"
  }
}
