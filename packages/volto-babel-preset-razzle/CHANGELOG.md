# @plone/babel-preset-razzle Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.2 (2026-10-07)

### Internal

- The `release` scripts now take the GitHub token from `gh auth token` when `GITHUB_TOKEN` is not set, and run `towncrier` with `uvx` instead of `pipx`. @sneridagh 

## 1.0.1 (2026-05-20)

### Internal

- Force release @plone/babel-preset-razzle to npm. @sneridagh 

## 1.0.0 (2026-05-19)

### Internal

- Release Volto 19.0.0 final. @sneridagh 

## 1.0.0-alpha.1 (2026-05-07)

### Documentation

- Added package-specific `AGENTS.md` contributor guidance for `@plone/babel-preset-razzle` maintainers.
