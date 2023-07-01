The Volto team enforces the following branch policy when developers contribute to its core.

Releases of general packages (`@plone/generator-volto`, `@plone/scripts`, and so on) are cut from the `master` branch.

stable and latest
:   The terms _stable_ and _latest_ mean the same thing in this policy.
    They refer to the stable and latest released version of Volto.
    They have no branch names in git.

canary
:   The term _canary_ refers to the metaphorical canary in a coalmine; if an issue is detected following its release, the damage is limited to only those users who have installed it.
    It usually includes experimental and breaking features for testing.
    During the development process, a canary release will be cut from the `master` branch.
    When it becomes worthy of a beta or release candidate version, a new numbered branch should be cut, and non-breaking changes must be merged into it.

legacy
:   A version that it is unsupported and receives no bug fixes.
    It has no branch name in git.

`master`
:   This is the bleeding edge branch in git.
    It is the branch upon which future development occurs, and from which future releases shall be cut.

    When we cut a release candidate, we:

    1.  create a new numbered git branch from master, and
    2.  cut a release candidate version whose name aligns with the new numbered git branch.

    For example, when we cut the release candidate version 16.0.0-rc.1, we created a git branch `16.x.x`.
    We also freeze the release candidate, and stop adding features to it.
    This allows us to continue development on `master`, which may include both breaking changes that must not be backported, and bug fixes and feature additions that may be backported but only after the release candidate becomes final.

    When opening a pull request, the contributor must open it against `master`.
    If the pull request is a feature or a bugfix, and if the release manager deems it useful to the latest version's branch, they may ask the contributor to backport it to that branch.

`16.x.x`
:   This is the current actively developed branch in git, meaning that it may receive new features and bug fixes.
    Its version is currently at 16.0.0-rc.1 as a release candidate.
    It will become the stable version upon the final release of version 16.0.0.

`15.x.x`
:   At the moment of this writing, `15.x.x` is the current stable branch in git.
    Upon the final release of version 16.0.0, the `15.x.x` branch line will become legacy.

## Translation contributing policy

Due to the nature of `master` and `16.x.x` branches, some developments that may land in `master` may not be backported to `16.x.x`. This means that many translations that may come with those developments will be useless in the `16.x.x` branch and thus porting them to `16.x.x` makes no sense.

So when contributing translations, please create PRs directly from branches created from `16.x.x` and point your PRs to that exact branch instead of `master`.
