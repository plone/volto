/* eslint no-console: 0 */
import fs from 'fs';
import { parse, stringify } from 'comment-json';

let vscodeSettingsJSON;
if (fs.existsSync('.vscode')) {
  vscodeSettingsJSON = parse(fs.readFileSync('.vscode/settings.json', 'utf8'));
} else {
  fs.mkdirSync('.vscode');
  fs.writeFileSync('.vscode/settings.json', '{}');
  vscodeSettingsJSON = parse(fs.readFileSync('.vscode/settings.json', 'utf8'));
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

fs.writeFileSync(
  '.vscode/settings.json',
  `${stringify(vscodeSettingsJSON, null, 2)}`,
);
