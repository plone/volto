// A script to copy the catalog key from core/pnpm-workspace.yaml to pnpm-workspace.yaml
import fs from 'fs';
import { load, dump } from 'js-yaml';

const inputFile = 'core/pnpm-workspace.yaml';
const outputFile = 'pnpm-workspace.yaml';
const key = 'catalog';

try {
  const sourceContents = fs.readFileSync(inputFile, 'utf8');
  const targetContents = fs.readFileSync(outputFile, 'utf8');
  const sourceData = load(sourceContents);
  const targetData = load(targetContents);
  const outputData = { ...targetData, [key]: sourceData[key] };
  fs.writeFileSync(outputFile, dump(outputData));
  console.log(`Successfully copied ${key} to ${outputFile}`);
} catch (e) {
  console.error(e);
}
