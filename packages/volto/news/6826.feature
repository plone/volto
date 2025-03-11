- Refactor the UniversalLink component using typescript.
- Modify tsconfig, include types located in `types` folder, otherwise d.ts files will noch be recognized in .tsx files, e.g. inside components. I need this for the 
`react-router-hash-link` package, that we use in the UniversalLink component. The specific file is `/types/react-router-hash-link.d.ts`.
- Modify lint-staged.config.js to exclude d.ts files.
- Use newest version of classnames.
@tomschall