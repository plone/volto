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
  "devDependencies": {
    "@plone/scripts": "^3.5.0",
    "@plone/types": "^1.0.0-alpha.5",
    "@storybook/addon-actions": "^6.3.0",
    "@storybook/addon-controls": "6.3.0",
    "@storybook/addon-essentials": "^6.3.0",
    "@storybook/addon-links": "^6.3.0",
    "@storybook/builder-webpack5": "^6.5.15",
    "@storybook/manager-webpack5": "^6.5.15",
    "@storybook/react": "^6.3.0",
    "@testing-library/cypress": "10.0.1",
    "@testing-library/jest-dom": "6.4.2",
    "@testing-library/react": "14.2.0",
    "@testing-library/react-hooks": "8.0.1",
    "@types/jest": "^29.5.8",
    "@types/lodash": "^4.14.201",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/react-router-dom": "^5.3.3",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "7.2.0",
    "@typescript-eslint/parser": "7.2.0",
    "cypress": "13.6.6",
    "cypress-axe": "1.5.0",
    "cypress-file-upload": "5.0.8",
    "eslint": "8.49.0",
    "eslint-config-prettier": "9.1.0",
    "eslint-config-react-app": "7.0.1",
    "eslint-import-resolver-alias": "1.1.2",
    "eslint-plugin-import": "2.29.1",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-prettier": "5.1.3",
    "eslint-plugin-react": "7.33.2",
    "eslint-plugin-react-hooks": "4.6.0",
    "jest-junit": "8.0.0",
    "mrs-developer": "^2.1.1",
    "postcss": "8.4.13",
    "prettier": "3.2.5",
    "razzle": "4.2.18",
    "stylelint": "^16.2.1",
    "stylelint-config-idiomatic-order": "10.0.0",
    "stylelint-prettier": "5.0.0",
    "ts-jest": "^26.4.2",
    "ts-loader": "9.4.4",
    "typescript": "5.4.2"
  },
  "resolutions": {
    "@pmmmwh/react-refresh-webpack-plugin": "0.5.11",
    "react-error-overlay": "6.0.9",
    "react-refresh": "0.14.0"
  },
  "packageManager": "yarn@3.2.3"
}
