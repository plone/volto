---
myst:
  html_meta:
    "description": "Volto Style Guide"
    "property=og:description": "Volto Style Guide"
    "property=og:title": "Style Guide"
    "keywords": "Volto, Plone, frontend, React, Style, Guide, Design, Quanta, Pastanaga"
---

# Style Guide

## About design systems

A Design System is the single source of truth which groups all the elements that will allow the teams to design, realize and develop a product. So a Design System is not a deliverable, but a set of deliverables. It will evolve constantly with the product, the tools and the new technologies.

Volto (and thus, Plone 6) has a design system in the making since some years ago. Albert Casado Celma (@albertcasado) has been working on it and providing with a lot of hints and advices about how Volto's UI/UX should be. As stated at the beginning, a design system is a continuous effort, that evolves over time with the users' feedback and needs.

Albert gifted the community with Pastanaga UI some years ago, which was implemented during last years as default theme UI and UX in Volto itself. Although unfinished, it provided us with endless resources and patterns that we applied to Volto bit by bit.

Lately, Albert has evolved Pastanaga to match the current trends, the feedback of these last years and the lessons learned developing Volto projects. So he has evolved Pastanaga and created Quanta. You can think in Quanta in a PastanagaUI 2.0.

You can find some excerpts of how Quanta looks like in this PDF file: {download}`Quanta Spring 2021 <Quanta.pdf>`

## Tooling around a design system

Volto adopted some time ago [Storybook](https://storybook.js.org), a tool that is specific for build and show off the visual elements that a design system has in isolation. Storybook provides a sandbox to build and test these visual elements (components) in isolation, mock them to show different data and test edge cases and at the same time document them, on how to instantiate them and use them for the developers' own benefit.

Not all Volto's visual components are covered yet in Storybook, but it has already a good foundation.

You can find the current Storybook build in: https://6.docs.plone.org/storybook

## Quanta, the design system for Plone 6

The idea is that Quanta will become the design system for Plone 6 when it's finished. For now, Pastanaga and Quanta are treated as preliminary work and style guide to help Volto and Plone 6 a reality.

It has been already some work on Quanta here and there, the idea is to adopt it bit by bit, since implementing it overnight would be impossible since maintaining both efforts, master and Quanta in sync would be crazy.

Quanta for now have the shape of a Volto addon: https://github.com/plone/volto-quanta

## Help to make Quanta a reality

Do you want to help Quanta a reality in Plone 6? Just ping the Volto Team in Github or in the Plone organization Volto Slack channel: https://plone.slack.com/?redir=%2Farchives%2FCQLBSUKRT to ask for access to the Quanta specs.
