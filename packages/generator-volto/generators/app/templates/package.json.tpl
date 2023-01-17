{
  "name": "<%= projectName %>",
  "description": "<%= projectDescription %>",
  "license": "MIT",
  "version": "1.0.0",
  "scripts": {
    "start": "razzle start",
    "postinstall": "make omelette && make patches",
    "build": "razzle build --noninteractive",
    "lint": "./node_modules/eslint/bin/eslint.js --max-warnings=0 'src/**/*.{js,jsx}'",
    "lint:fix": "./node_modules/eslint/bin/eslint.js --max-warnings=0 --fix 'src/**/*.{js,jsx}'",
    "lint:ci": "./node_modules/eslint/bin/eslint.js --max-warnings=0 -f checkstyle 'src/**/*.{js,jsx}' > eslint.xml",
    "prettier": "./node_modules/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,css,scss}'",
    "prettier:fix": "./node_modules/.bin/prettier --single-quote --write 'src/**/*.{js,jsx,ts,tsx,css,scss}'",
    "prettier:ci": "./node_modules/.bin/prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,css,scss}'",
    "stylelint": "stylelint 'theme/**/*.{css,scss,less}' 'src/**/*.{css,scss,less}'",
    "stylelint:overrides": "stylelint 'theme/**/*.overrides' 'src/**/*.overrides'",
    "stylelint:fix": "yarn stylelint --fix && yarn stylelint:overrides --fix",
    "test": "razzle test --passWithNoTests",
    "cypress:open": "make test-acceptance",
    "cypress:run": "test-acceptance-headless",
    "start:prod": "NODE_ENV=production node build/server.js",
    "i18n": "rm -rf build/messages && NODE_ENV=production i18n",
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
      "^.+\\.(png)$": "jest-file",
      "^.+\\.(jpg)$": "jest-file",
      "^.+\\.(svg)$": "./node_modules/@plone/volto/jest-svgsystem-transform.js"
    },
    "transformIgnorePatterns": [
      "/node_modules/(?!@plone/volto).+\\.js$"
    ],
    "moduleNameMapper": {
      "@plone/volto/cypress/(.*)$": "<rootDir>/node_modules/@plone/volto/cypress/$1",
      "@plone/volto/addon-registry": "<rootDir>/node_modules/@plone/volto/addon-registry",
      "@plone/volto/webpack-plugins/webpack-less-plugin": "<rootDir>/node_modules/@plone/volto/webpack-plugins/webpack-less-plugin",
      "@plone/volto/babel": "<rootDir>/node_modules/@plone/volto/babel",
      "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
      "load-volto-addons": "<rootDir>/node_modules/@plone/volto/jest-addons-loader.js",
      "@package/(.*)$": "<rootDir>/src/$1",
      "@root/(.*)$": "<rootDir>/src/$1",
      "~/(.*)$": "<rootDir>/src/$1",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
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
    "node": "^14 || ^16"
  },
  "dependencies": <%- dependencies %>,
  "devDependencies": {
    "eslint-plugin-prettier": "3.1.3",
    "jest-junit": "8.0.0",
    "mrs-developer": "*",
    "postcss": "8.4.13",
    "prettier": "2.0.5",
    "@plone/scripts": "^2.1.5",
    "@storybook/addon-actions": "^6.3.0",
    "@storybook/addon-controls": "6.3.0",
    "@storybook/addon-essentials": "^6.3.0",
    "@storybook/addon-links": "^6.3.0",
    "@storybook/react": "^6.3.0",
    "razzle": "4.2.17",
    "stylelint": "14.0.1",
    "stylelint-config-idiomatic-order": "8.1.0",
    "stylelint-config-prettier": "8.0.1",
    "stylelint-prettier": "1.1.2"
  },
  "packageManager": "yarn@3.2.3"
}
