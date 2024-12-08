# Plone Improvement Proposals (PLIPs)

For details of the PLIP process, read the following.

- [Plone Improvement Proposals (PLIPs)](https://6.docs.plone.org/contributing/core/plips.html)
- [PLIP review](https://6.docs.plone.org/contributing/core/plip-review.html)

You can also [browse the current list of open PLIPs for Volto](https://github.com/plone/volto/labels/03%20type%3A%20feature%20(plip)).

## 6321 - Remove Semantic UI from CMSUI

Link to PLIP: [Remove Semantic UI from CMSUI](https://github.com/plone/volto/issues/6321)

### Directives

This PLIP is targeted to Plone 7.
The main goal is to get rid of Semantic UI powered components in the CMSUI.
It is expected to be a long lived branch, and we probably will want some of the changes already available for the API-first story, let's make some assumptions and rules.

All Semantic UI basic, fundamental components should be replaced by their counterparts in `@plone/components`.
Every time that we find missing components, we should create them in `@plone/components` and use them in Volto components.
These components will follow the `@plone/components` best practices, including being written in TypeScript, have accessibility tests, and have a Storybook story.
We'd like to have these new components out of this PR and used right away, so let's make all the commits around them as atomic as possible so we can cherry pick them safely and push for them in the main branch.

Every new component used in the CMSUI will be transfered from Volto core to the package `@plone/cmsui`.
By doing so, we will keep track of every new "clean" component, and potentially—being able to extract them when we want—we can use them in "real" life right away.
It will help also to avoid merging hell.
When this PLIP is done, the `src/components/manage` folder should be empty (or almost empty).
Code in Volto will remain references and imports to the `@plone/cmsui` package.

Once we start, only meaningful changes in `main` in CMSUI components will be backported, again to avoid merging hell.
