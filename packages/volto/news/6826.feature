- Refactor the UniversalLink component using typescript.
- Use union types for deciding between href or item.
- Modify tsconfig, include types located in `types` folder, otherwise d.ts files will noch be recognized in .tsx files, e.g. inside components. I need this for the 
`react-router-hash-link` package, that we use in the UniversalLink component. The specific file is `/types/react-router-hash-link.d.ts`.
- Modify lint-staged.config.js to exclude d.ts files.
- Use newest version of classnames (with types).
- Create tests and negative tests for optimization with React.memo (add render counter for testing this behavior)

@tomschall