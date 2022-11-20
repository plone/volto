Volto has a branch policy that matches the current releases (stable, canary) development.

`master` is the bleeding edge branch. It is the branch upon which future development occurs, and from which future releases shall be cut.

There is always a current “stable” and “latest” branch of Volto. At the moment of this writting, 15.x.x is the current stable. Upon the final release of 16.0.0, the 15.x.x line will become “legacy”, meaning that it shall become unsupported with no bug fixes.

16.x.x is the current actively developed branch, meaning that it may receive new features and bug fixes. Its version is currently at 16.0.0-rc.1 as a release candidate. It will become the “stable” and “latest” version upon the final release of version 16.0.0.

Releases happen from the corresponding numbered branch. Releases of general packages (`@plone/generator-volto`, `@plone/scripts`, etc) happen from `master`.

If there's any "canary" release during the development process this will be released from `master`, bleeding edge branch. The moment it becomes "beta" or "RC" a new numbered branch should be cut, and not breaking changes must be merged into it.

When opening a PR, the contributor has to target it always to `master`. If it's a feature or a bugfix, the release manager can ask the contributor to backport it to the "stable" branch if the contribution is interesting to be included in there.
