#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class SyncValidator {
  constructor() {
    this.docsDir = path.join(__dirname, '../../docs/source');
    this.examplesDir = path.join(this.docsDir, '_examples');
  }

  extractLiteralIncludes() {
    const markdownFiles = glob.sync('**/*.md', {
      cwd: this.docsDir,
      absolute: true,
    });

    const references = [];
    
    for (const file of markdownFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const literalIncludePattern = /```\{literalinclude\}\s+([^\n]+)/g;
      
      let match;
      while ((match = literalIncludePattern.exec(content)) !== null) {
        const referencedFile = match[1].trim();
        references.push({
          markdownFile: path.relative(this.docsDir, file),
          referencedFile,
          line: content.substring(0, match.index).split('\n').length,
        });
      }
    }

    return references;
  }

  validateReferences() {
    console.log('🔍 Validating literalinclude references...\n');
    
    const references = this.extractLiteralIncludes();
    let hasErrors = false;

    if (references.length === 0) {
      console.log('ℹ️  No literalinclude references found');
      return true;
    }

    console.log(`Found ${references.length} literalinclude references to validate`);

    for (const ref of references) {
      const fullPath = path.resolve(this.docsDir, ref.referencedFile);
      
      if (!fs.existsSync(fullPath)) {
        console.log(`❌ ${ref.markdownFile}:${ref.line} - Referenced file not found: ${ref.referencedFile}`);
        hasErrors = true;
      } else {
        console.log(`✅ ${ref.markdownFile}:${ref.line} - ${ref.referencedFile}`);
      }
    }

    if (!hasErrors) {
      console.log('\n✅ All literalinclude references are valid!');
    }

    return !hasErrors;
  }

  extractInlineCodeBlocks() {
    console.log('🔍 Finding inline JSX code blocks that could be migrated...\n');
    
    const markdownFiles = glob.sync('**/*.md', {
      cwd: this.docsDir,
      absolute: true,
    });

    const codeBlocks = [];
    
    for (const file of markdownFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const codeBlockPattern = /```jsx\n([\s\S]*?)\n```/g;
      
      let match;
      while ((match = codeBlockPattern.exec(content)) !== null) {
        const code = match[1];
        const lineNumber = content.substring(0, match.index).split('\n').length;
        
        codeBlocks.push({
          file: path.relative(this.docsDir, file),
          line: lineNumber,
          code: code.trim(),
        });
      }
    }

    if (codeBlocks.length === 0) {
      console.log('✅ No inline JSX code blocks found - all migrated!');
    } else {
      console.log(`Found ${codeBlocks.length} inline JSX code blocks that could be migrated:`);
      codeBlocks.forEach(block => {
        console.log(`   📄 ${block.file}:${block.line} (${block.code.split('\n').length} lines)`);
      });
      console.log('\nConsider migrating these to separate files for better linting.');
    }

    return codeBlocks;
  }

  generateMigrationReport() {
    console.log('📊 Documentation Code Quality Report\n');
    
    const references = this.extractLiteralIncludes();
    const inlineBlocks = this.extractInlineCodeBlocks();
    
    console.log(`📈 Statistics:`);
    console.log(`   Literalinclude references: ${references.length}`);
    console.log(`   Inline JSX blocks: ${inlineBlocks.length}`);
    console.log(`   Migration progress: ${references.length}/${references.length + inlineBlocks.length} (${Math.round(references.length / (references.length + inlineBlocks.length) * 100) || 0}%)`);
    
    if (inlineBlocks.length > 0) {
      console.log(`\n📋 Files with inline JSX blocks to migrate:`);
      const fileGroups = {};
      inlineBlocks.forEach(block => {
        if (!fileGroups[block.file]) fileGroups[block.file] = 0;
        fileGroups[block.file]++;
      });
      
      Object.entries(fileGroups).forEach(([file, count]) => {
        console.log(`   📄 ${file}: ${count} block${count > 1 ? 's' : ''}`);
      });
    }
  }
}

async function main() {
  const validator = new SyncValidator();
  
  const args = process.argv.slice(2);
  
  if (args.includes('--report')) {
    validator.generateMigrationReport();
  } else if (args.includes('--find-inline')) {
    validator.extractInlineCodeBlocks();
  } else {
    const isValid = validator.validateReferences();
    if (!isValid) {
      console.log('\n❌ Reference validation failed!');
      process.exit(1);
    }
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SyncValidator; 