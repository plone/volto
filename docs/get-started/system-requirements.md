---
myst:
  html_meta:
    "description": "System requirements and prerequisites for Plone"
    "property=og:description": "System requirements and prerequisites for Plone"
    "property=og:title": "System requirements and prerequisites for Plone"
    "keywords": "Plone, Seven, system, requirements, prerequisites, uv, nvm, Node.js, GNU make, git, Cookieplone"
---

(install-seven-cookieplone-label)=

# System requirements

This chapter describes the system requirements for using Plone.

Plone has both hardware requirements and software prerequisites.


(seven-create-project-cookieplone-hardware-requirements-label)=

## Hardware requirements

````{ifconfig} context not in ("volto",)
```{include} /volto/_inc/_hardware-requirements.md
```
````
````{ifconfig} context in ("volto",)
```{include} /_inc/_hardware-requirements.md
```
`````

## Supported web browsers

````{ifconfig} context not in ("volto",)
```{include} /volto/_inc/_install-browser-reqs-volto.md
```
````
````{ifconfig} context in ("volto",)
```{include} /_inc/_install-browser-reqs-volto.md
```
````


(seven-create-project-cookieplone-prerequisites-for-installation-label)=

## Prerequisites for installation

````{ifconfig} context not in ("volto",)
```{include} /volto/_inc/_install-operating-system.md
```
````
````{ifconfig} context in ("volto",)
```{include} /_inc/_install-operating-system.md
```
````

-   {term}`uv`
-   {term}`nvm`
-   {term}`Node.js`
-   {term}`GNU make`
-   {term}`Git`


### uv

```{include} ../_inc/_install-uv.md
```


### nvm

```{note}
This prerequisite is optional when working only with backend add-ons. 
```

```{include} ../_inc/_install-nvm.md
```


(seven-prerequisites-nodejs-label)=

### Node.js

```{note}
This prerequisite is optional when working only with backend add-ons. 
```

```{include} ../_inc/_install-nodejs.md
```


### Make

```{include} ../_inc/_install-make.md
```


### Git

```{include} ../_inc/_install-git.md
```


## Next steps

From here, you're ready to {doc}`create a package with only a frontend add-on <create-package>` using {term}`Cookieplone`.