# Useful Information while developing PLIPs

## 6321 - SemanticUI free CMSUI

Link to PLIP: [SemanticUI free CMSUI](https://github.com/plone/volto/issues/6321)

### Directives

This PLIP is targeted to Plone 7.
The main goal is to get rid of SemanticUI powered components in the CMSUI.
It is expected to be a long lived branch, and we probably will want some of the changes already available for the API-first story, let's make some assumptions and rules.

All SemanticUI basic, fundamental components should be replaced by their counterparts in `@plone/components`.
Every time that we find that this components are missing, we should create them in `@plone/components` then used in Volto components.
These components will follow the `@plone/components` best practices, written in TypeScript, have accessibility tests and Storybook story.
We'd like to have these new components out of this PR and used right away, so let's make all the commits around them as atomic as possible so we can cherry pick them safely and push for them in the main branch.

Every new component used in the CMSUI will be transfered from Volto core to a package: `@plone/cmsui`.
By doing so, we will keep track of every new "clean" component and potentially, being able to extract them when we want, and use them in "real" life right away.
It will help also to avoid merging hell.
When this PLIP is done, the `src/components/manage` folder should be empty (or almost empty).
Code in Volto will remain references and imports to the `@plone/cmsui` package.

Once we start, only meaningful changes in `main` in CMSUI components will be backported, in order to again, avoid merging hell.
