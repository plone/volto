const recast = require('recast');
const { parse } = require('recast');
const fs = require('fs');
const path = require('path');

const barrelMap = {
  [path.resolve(path.join(__dirname, 'helpers'))]: '@plone/volto/helpers',
  [path.resolve(path.join(__dirname, 'components'))]: '@plone/volto/components',
  [path.resolve(path.join(__dirname, 'actions'))]: '@plone/volto/actions',
};

// Utility function to load aliases from tsconfig.json or jsconfig.json
function getAliases() {
  const configPath = path.resolve('tsconfig.json'); // Adjust if using jsconfig.json
  if (fs.existsSync(configPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const paths = tsconfig.compilerOptions && tsconfig.compilerOptions.paths;
    if (paths) {
      const baseUrl = './';
      return Object.keys(paths).reduce((aliasMap, alias) => {
        aliasMap[alias.replace('/*', '')] = path.resolve(
          baseUrl,
          paths[alias][0].replace('/*', ''),
        );
        return aliasMap;
      }, {});
    }
  }
  return {};
}

// Utility function to resolve module paths respecting aliases
function resolveWithAlias(modulePath, aliasMap) {
  for (const alias in aliasMap) {
    if (modulePath.startsWith(alias)) {
      return modulePath.replace(alias, aliasMap[alias]);
    }
  }
  return modulePath;
}

// Function to parse a barrel file and create a mapping of exports to files
function parseBarrelFile(barrelFilePath) {
  if (!fs.existsSync(barrelFilePath)) {
    return {};
  }

  const fileSource = fs.readFileSync(barrelFilePath, 'utf-8');
  const ast = parse(fileSource);
  const exportMapping = {};

  // Traverse the barrel file's AST to find export declarations
  recast.types.visit(ast, {
    visitExportNamedDeclaration(path) {
      const declaration = path.node.declaration;
      if (!declaration) {
        // Re-exported from another file
        const source = path.node.source && path.node.source.value;
        if (source) {
          path.node.specifiers.forEach((specifier) => {
            exportMapping[specifier.exported.name] = source;
          });
        }
      }
      this.traverse(path);
    },
  });

  return exportMapping;
}

module.exports = function (fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const aliasMap = getAliases(); // Get the aliases from tsconfig

  // Function to resolve the final import path by looking at the barrel exports
  function resolveImportFromBarrel(modulePath, importedName) {
    modulePath = resolveWithAlias(modulePath, aliasMap); // Resolve using alias map
    const barrelFilePath = path.resolve(modulePath, 'index.js'); // Assuming the barrel file is index.js

    const exportMapping = parseBarrelFile(barrelFilePath);

    if (exportMapping[importedName]) {
      let resolvedModule = exportMapping[importedName];
      if (resolvedModule.startsWith('@plone/volto')) {
        resolvedModule = resolveWithAlias(resolvedModule, aliasMap);
      }
      const resolvedPath = path.resolve(modulePath, resolvedModule);
      return resolvedPath;
    }

    return null;
  }

  // Transform the imports
  root
    .find(j.ImportDeclaration)
    .filter((path) =>
      Object.values(barrelMap).some((item) => path.node.source.value === item),
    ) // Adjust this condition to match your barrel path
    .forEach((importDecl) => {
      const modulePath = importDecl.node.source.value;
      const newImportsMap = [];
      const newImports = [];

      importDecl.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          const importedName = specifier.imported.name;
          const resolvedPath = resolveImportFromBarrel(
            modulePath,
            importedName,
          );
          if (resolvedPath) {
            if (newImportsMap?.[resolvedPath]) {
              newImportsMap[resolvedPath].push(importedName);
            } else {
              newImportsMap[resolvedPath] = [importedName];
            }
          }
        }
      });

      for (const resolvedPath in newImportsMap) {
        let backToModulePath;
        Object.entries(barrelMap).forEach(([key, value]) => {
          if (resolvedPath.includes(key)) {
            backToModulePath = resolvedPath.replace(key, value);
          }
        });

        newImports.push(
          j.importDeclaration(
            newImportsMap[resolvedPath].map((importedName) =>
              j.importSpecifier(j.identifier(importedName)),
            ),
            j.literal(backToModulePath),
          ),
        );
      }

      if (newImports.length > 0) {
        j(importDecl).replaceWith(newImports);
      }
    });

  return root.toSource();
};
