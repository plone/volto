{
  "name": "<%= projectName %>",
  "description": "<%= projectDescription %>",
  "license": "MIT",
  "version": "1.0.0",
  "scripts": {
    "start": "razzle start",
    "postinstall": "make omelette && make patches",
    "build": "razzle build --noninteractive",
    "lint": "eslint --max-warnings=0 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:ci": "eslint --max-warnings=0 -f checkstyle 'src/**/*.{js,jsx,ts,tsx}' > eslint.xml",
    "prettier": "prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,css,scss}'",
    "prettier:fix": "prettier --single-quote --write 'src/**/*.{js,jsx,ts,tsx,css,scss}'",
    "prettier:ci": "prettier --single-quote --check 'src/**/*.{js,jsx,ts,tsx,css,scss}'",
    "stylelint": "stylelint 'theme/**/*.{css,scss,less}' 'src/**/*.{css,scss,less}' --allow-empty-input",
    "stylelint:overrides": "stylelint 'theme/**/*.overrides' 'src/**/*.overrides' --allow-empty-input",
    "stylelint:fix": "yarn stylelint --fix && yarn stylelint:overrides --fix",
    "test": "razzle test --passWithNoTests",
    "typecheck": "tsc --project tsconfig.json --noEmit",
    "cypress:open": "make test-acceptance",
    "cypress:run": "test-acceptance-headless",
    "start:prod": "NODE_ENV=production node build/server.js",
    "i18n": "rm -rf build/messages && NODE_ENV=production i18n",
    "volto-update-deps": "volto-update-deps",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
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
      "^.+\\.ts(x)?$": "ts-jest",
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
      "@plone/volto-slate/(.*)$": "<rootDir>/node_modules/@plone/volto-slate/src/$1",
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
  "engines": {
    "node": "^18 || ^20"
  },
  "dependencies": <%- dependencies %>,
  "devDependencies": <%- devDependencies %>,
  "resolutions": {
    "@pmmmwh/react-refresh-webpack-plugin": "0.5.11",
    "react-error-overlay": "6.0.9",
    "react-refresh": "0.14.0"
  },
  "packageManager": "yarn@3.2.3"
}
