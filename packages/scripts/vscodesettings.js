/* eslint no-console: 0 */
import fs from 'fs';
import { parse, stringify } from 'comment-json';

let vscodeSettingsJSON;
let vscodeExtensionsJSON;
if (fs.existsSync('.vscode')) {
  vscodeSettingsJSON = parse(fs.readFileSync('.vscode/settings.json', 'utf8'));
  vscodeExtensionsJSON = parse(
    fs.readFileSync('.vscode/extensions.json', 'utf8'),
  );
} else {
  fs.mkdirSync('.vscode');
  fs.writeFileSync('.vscode/settings.json', '{}');
  vscodeSettingsJSON = parse(fs.readFileSync('.vscode/settings.json', 'utf8'));
  fs.writeFileSync('.vscode/extensions.json', '{}');
  vscodeExtensionsJSON = parse(
    fs.readFileSync('.vscode/extensions.json', 'utf8'),
  );
}

if (!vscodeSettingsJSON['eslint.workingDirectories']) {
  vscodeSettingsJSON['eslint.workingDirectories'] = [{ mode: 'auto' }];
}

if (!vscodeSettingsJSON['[markdown]']) {
  vscodeSettingsJSON['[markdown]'] = {
    'editor.formatOnSave': false,
  };
} else {
  vscodeSettingsJSON['[markdown]']['editor.formatOnSave'] = false;
}

if (!vscodeSettingsJSON['tailwindCSS.experimental.configFile']) {
  vscodeSettingsJSON['tailwindCSS.experimental.configFile'] =
    'apps/seven/publicui.css';
}

if (!vscodeSettingsJSON['tailwindCSS.classFunctions']) {
  vscodeSettingsJSON['tailwindCSS.classFunctions'] = [
    'tv',
    'twMerge',
    'tw',
    'clsx',
  ];
}

// Defaults plus md(x)
if (!vscodeSettingsJSON['tailwindCSS.files.exclude']) {
  vscodeSettingsJSON['tailwindCSS.files.exclude'] = [
    '**/.git/**',
    '**/node_modules/**',
    '**/coverage/**',
    '**/.next/**',
    '**/.storybook/**',
    '**/*.md',
    '**/*.mdx',
  ];
}

if (!vscodeSettingsJSON['[typescript][typescriptreact]']) {
  vscodeSettingsJSON['[typescript][typescriptreact]'] = {
    'editor.formatOnSave': true,
    'editor.tabSize': 2,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': 'explicit',
    },
  };
}

// Taken from tailwind-variants but it's too greedy
// We need a more specific one
// if (!vscodeSettingsJSON['tailwindCSS.experimental.classRegex']) {
//   vscodeSettingsJSON['tailwindCSS.experimental.classRegex'] = [
//     ['(["\'`][^"\'`]*.*?["\'`])', '["\'`]([^"\'`]*).*?["\'`]'],
//   ];
// }

fs.writeFileSync(
  '.vscode/settings.json',
  `${stringify(vscodeSettingsJSON, null, 2)}`,
);

const extensions = [
  'dbaeumer.vscode-eslint',
  'esbenp.prettier-vscode',
  'stylelint.vscode-stylelint',
  'bradlc.vscode-tailwindcss',
];

if (!vscodeExtensionsJSON['recommendations']) {
  vscodeExtensionsJSON['recommendations'] = extensions;
} else {
  extensions.forEach((extension) => {
    if (!vscodeExtensionsJSON['recommendations'].includes(extension)) {
      vscodeExtensionsJSON['recommendations'].push(extension);
    }
  });
}

fs.writeFileSync(
  '.vscode/extensions.json',
  `${stringify(vscodeExtensionsJSON, null, 2)}`,
);
