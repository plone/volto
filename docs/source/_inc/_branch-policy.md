The Volto team enforces the following branch policy when developers contribute to its core.

Releases of general packages (`@plone/generator-volto`, `@plone/scripts`, and so on) are cut from the `main` branch.

stable and latest
:   The terms _stable_ and _latest_ mean the same thing in this policy.
    They refer to the stable and latest released version of Volto.
    They have no branch names in git.

canary
:   The term _canary_ refers to the metaphorical canary in a coalmine; if an issue is detected following its release, the damage is limited to only those users who have installed it.
    It usually includes experimental and breaking features for testing.
    During the development process, a canary release will be cut from the `main` branch.
    When it becomes worthy of a beta or release candidate version, a new numbered branch should be cut, and non-breaking changes must be merged into it.

legacy
:   The term _legacy_ refers to a version that is no longer supported or actively maintained.
    They are the versions between official Plone minor releases.
    You should update to minor Plone releases as soon as possible.
    Legacy versions won't receive any new features.
    They might receive occasional bug fixes or security updates, subject to approval from the Volto Team.

`main`
:   This is the bleeding edge branch in git.
    It is the branch upon which future development occurs, and from which future releases shall be cut.

    When we cut a release candidate, we:

    1.  create a new numbered git branch from main, and
    2.  cut a release candidate version whose name aligns with the new numbered git branch.

    For example, when we cut the release candidate version 16.0.0-rc.1, we created a git branch `16.x.x`.
    We also freeze the release candidate, and stop adding features to it.
    This allows us to continue development on `main`, which may include both breaking changes that must not be backported, and bug fixes and feature additions that may be backported but only after the release candidate becomes final.

    When opening a pull request, you must open it against `main`, unless it involves translations.
    See {ref}`contributing-branch-policy-for-translations-label` for details.

    If the pull request is a feature or a bugfix, and if the release manager deems it useful to the latest version's branch, they may ask you to backport it to that branch.

`18.x.x`
:   `18.x.x` is the current stable and actively developed branch in git.
    This version of Volto has the [same maintenance and support schedule as Plone 6.1](https://plone.org/download/release-schedule).
    Any new feature will be merged into the `main` branch, and only backported to and released in older versions, if the Volto Team approves it.

`17.x.x`
:   `17.x.x` is no longer supported and became _legacy_ (see above definition) when Volto 18 was released.
    You should upgrade to the latest released version of Volto 18.
    You can use Cookieplone to generate a new Volto 18 project, then copy-paste over the relevant parts from your existing project into the new one.
    See {ref}`volto-upgrade-guide-18.x.x`.
    If you need a bug fix, please create an issue to discuss with the Volto Team.
    For security issues, please contact the Plone Security Team by sending email to security@plone.org.

`16.x.x`
:   This version of Volto has the [same maintenance and support schedule as Plone 6.0](https://plone.org/download/release-schedule).
    It receives bug fixes and security updates.
    Any new feature will be merged into the `main` branch, and only backported to and released in older versions, if the Volto Team approves it.

`15.x.x`
:   `15.x.x` and older branches are no longer supported.
    If you need a bug fix or security update to any of them, please submit a pull request, and the Volto Team will review it to determine whether it's suitable to merge.
