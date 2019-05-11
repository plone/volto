# Introduction

Volto is a React-based frontend for content management systems (CMS), currently supporting three backend implementations: Plone, Guillotina, and a NodeJS reference implementation.

Plone is an CMS, which was written in Python back in 2001 and cherishes an unmatched experience in the subject. It has exciting features that are still appealing to developers and users alike. Such as customizable content types, hierarchical URL object traversing, and a sophisticated content workflow powered by a granular permissions model that allows you to build from simple websites to huge complex intranets.

Volto exposes all those features and communicates with Plone via its mature REST API. It can be highly themeable and customizable. Volto also supports other APIs like Guillotina, a Python resource management system, which is inspired by Plone using the same basic concepts like traversal, content types, and permissions model.

Last but not least, it also supports a Volto Nodejs-based backend reference API implementation that demos how other systems could also use Volto to display and create content through it. Like any CMS, Volto is capable of taking care of Server Side Rendering (SSR) to support SEO.

## Vision

The vision behind this project is to enable the React developers to make use of a stable, mature, and feature-rich backend to provide Content Management functionality without having to learn Plone or Python. Developing websites with Volto is done purely in React using SemanticUI components. `plone.restapi` — Which is a Plone REST API, is used to power Volto. It allows website developers to utilize Plone features while essentially treating it as a 'black box.' 
