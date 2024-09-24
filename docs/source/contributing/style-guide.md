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

A Design System serves as the definitive reference point consolidating all essential elements necessary for teams to design, implement, and advance a product.
It encompasses a collection of deliverables rather than being a singular output.
Continuously adapting alongside the product, tools, and emerging technologies, it undergoes constant evolution.

Volto, and thus Plone 6, underwent a gradual evolution of its design system over multiple years.

## Volto and Pastanaga UI

Around 2017, Albert Casado Celma introduced Pastanaga UI, which became Volto's default theme UI/UX.
Despite being unfinished, it provided valuable resources and patterns gradually integrated into Volto.
Albert has played a crucial role in refining Volto's UI/UX, offering valuable insights and guidance.
As mentioned earlier, design systems evolve over time based on user feedback and changing needs.

## Tooling around a design system

Volto adopted some time ago [Storybook](https://storybook.js.org), a tool that interactively displays the visual elements of a design system.
Storybook provides a sandbox to build and test these visual elements (components) in isolation, mock them to show different data, and test edge cases.
At the same time, Storybook documents components for how to instantiate them and use them in development.

Not all Volto's visual components are covered yet in Storybook, but it has already a good foundation.
Look at the current components [Storybook build](https://6.docs.plone.org/storybook).

## Quanta, the design system for Plone 7

Recently, Albert updated Pastanaga UI to align with current trends and feedback, creating Quanta, a version 2.0 of Pastanaga UI.
This reflects ongoing refinement and enhancement of the design system.
Check out Quanta's appearance in this PDF: {download}`Quanta Spring 2021 <Quanta.pdf>`.

Its implementation has been challenging due to the community's emphasis on stability and the lack of demand from projects.
While Quanta offers significant improvements, updating JavaScript and CSS poses a barrier for many.
Stability remains a priority, especially considering the potential disruptions caused by incremental changes.

The idea of incorporating Quanta aligns with the broader context of advancing headless CMS capabilities.
However, it necessitates the development of a new theming framework, which is currently underway.
Once all components are in place, Volto can be reassembled with Quanta.

Although the timeline for Quanta's integration, potentially in Plone 7, remains uncertain, progress is being made on experimental packages.
Generating interest within the community is also a priority.

In the meantime, for upcoming projects, Volto with Pastanaga UI remains the recommended and viable option.

## Help to make Quanta a reality

Do you want to help Quanta become a reality?
Just ping the Volto Team on GitHub or in the [Plone organization Discord](https://plone.org/community/chat) channel [`#frontend-volto`](https://discord.com/channels/786421998426521600/787308038050545666) to ask for access to the Quanta specs and how to help.
