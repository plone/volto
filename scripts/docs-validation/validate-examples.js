#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const glob = require('glob');

class DocumentationValidator {
  constructor() {
    this.examplesDir = path.join(__dirname, '../../docs/source/_examples');
    this.eslint = new ESLint({
      cwd: path.join(__dirname, '../..'),
      useEslintrc: true,
    });
  }

  async validateAllExamples() {
    console.log('🔍 Validating documentation examples...\n');
    
    const exampleFiles = glob.sync('**/*.{js,jsx,ts,tsx}', {
      cwd: this.examplesDir,
      absolute: true,
    });

    if (exampleFiles.length === 0) {
      console.log('No example files found');
      return true;
    }

    console.log(`Found ${exampleFiles.length} example files to validate`);

    const results = await this.eslint.lintFiles(exampleFiles);
    const formatter = await this.eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);

    if (resultText) {
      console.log(resultText);
    }

    const errorCount = results.reduce((sum, result) => sum + result.errorCount, 0);
    const warningCount = results.reduce((sum, result) => sum + result.warningCount, 0);

    console.log(`\n Validation Results:`);
    console.log(`Files checked: ${exampleFiles.length}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Warnings: ${warningCount}`);

    if (errorCount > 0) {
      console.log('\nValidation failed! Please fix the errors above.');
      process.exit(1);
    } else if (warningCount > 0) {
      console.log('\nValidation passed with warnings.');
    } else {
      console.log('\nAll examples passed validation!');
    }

    return errorCount === 0;
  }

  async validateSyntax() {
    console.log('Checking syntax of all example files...\n');
    
    const exampleFiles = glob.sync('**/*.{js,jsx,ts,tsx}', {
      cwd: this.examplesDir,
      absolute: true,
    });

    let hasErrors = false;

    for (const file of exampleFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const babel = require('@babel/parser');
        babel.parse(content, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        });
        console.log(`${path.relative(this.examplesDir, file)}`);
      } catch (error) {
        console.log(`${path.relative(this.examplesDir, file)}: ${error.message}`);
        hasErrors = true;
      }
    }

    if (!hasErrors) {
      console.log('\nAll example files have valid syntax!');
    }

    return !hasErrors;
  }

  async listExamples() {
    console.log('Documentation Examples:\n');
    
    const exampleFiles = glob.sync('**/*.{js,jsx,ts,tsx}', {
      cwd: this.examplesDir,
      absolute: false,
    });

    if (exampleFiles.length === 0) {
      console.log('No example files found');
      return;
    }

    const grouped = {};
    exampleFiles.forEach(file => {
      const dir = path.dirname(file);
      if (!grouped[dir]) grouped[dir] = [];
      grouped[dir].push(path.basename(file));
    });

    Object.keys(grouped).sort().forEach(dir => {
      console.log(`${dir}/`);
      grouped[dir].forEach(file => {
        console.log(`${file}`);
      });
    });
  }
}

async function main() {
  const validator = new DocumentationValidator();
  
  const args = process.argv.slice(2);
  
  if (args.includes('--syntax-only')) {
    await validator.validateSyntax();
  } else if (args.includes('--list')) {
    await validator.listExamples();
  } else {
    await validator.validateAllExamples();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = DocumentationValidator; 