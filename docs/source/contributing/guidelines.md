# Guidelines

You probably came here by clicking one of the ‘guidelines for contributing’ links on
GitHub. You probably have an issue to report or you want to create a pull request.
Thanks a lot! Let’s bring you up to speed with the minimum you need to know to start
contributing.

## Create an issue

If you know the issue is for a specific package, you can add an issue there. When in
doubt, create one in the CMFPlone issue tracker.

Please specify a few things:

- What steps reproduce the problem?

- What do you expect when you do that?

- What happens instead?

- Which Plone version are you using?

If it is a visual issue, can you add a screenshot?

## Create a pull request

Legally, you can NOT contribute code unless you have signed the contributor agreement.
This means that we can NOT accept pull requests from you unless this is done, so please
don’t put the code reviewers at risk and do it anyways.

For new features, an addition to documentation is probably needed.

If the feature includes a breaking change, you should also add the breaking and how to
upgrade in the [upgrade guide](../upgrade-guide/index.md).

All text that can be shown in a browser must be translatable. Please mark all such
strings as translatable as defined in the [i18n guide](../customizing/i18n.md)

Code formatting and linting are already enforced in Volto.

See if you can use git to squash multiple commits into one where this makes sense. If
you are not comfortable with git, never mind.

If after reading this you become hesitant: don’t worry. You can always create a pull
request, mark it as WIP (work in progress), and improve the above points later.
