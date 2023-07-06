# Quanta Design System - Volto Add-on

Quanta is the (new) design system for Volto by Albert Casado (@albertcasado). You can think on it as the evolution of Pastanaga UI.

Quanta is quite more than some aesthetics changes in Pastanaga UI, it comprises from a complete Widget redesign (control forms, etc) to buttons, toolbar, etc and their related UX.

Quanta will also address some known Pastanaga UI issues.

**This package is experimental and in their first stages of development. Its form, internal structure and features might change without further notice. This will be true unless it's noted otherwise.**

## Quanta as a CMSUI for the future Volto Theming story

TODO:

## Why we are going for headless component library in Quanta

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268

## Rationale

The idea to start with a Volto add-on is because the change can't happen overnight, since that many things have to be refactored, tested, and delivered. So using a branch is off the table. Volto Add-ons deliver today all what we need to make the development of Quanta in approachable bits, then give the ability to test drive it both in project development and even in production. Volto's extensibility (by using the component registry) and component shadowing feature makes that extremely easy for Widgets and other components to switch to the next version of a given component, contained in this add-on.

## Features

We need Quanta to be accessible by default, so we need to put effort into make it possible.

It should match the new Quanta design system, pixel perfect if possible 🙂

## Goals

These are the main goals for the Quanta implementation.

- Quanta should not be a breaking change for anyone.
- Quanta is a design system, a style guide, and the means to put it all together in a sensible and extensible way in Plone 6 frontend (Volto).
- We will have three separate CSS bundles, one for the Theme, another for the CMSUI and the support bundle.
- This three bundles will be separated and have the capability to be loaded on demand (specially, the CMSUI).
- The theme bundle has to be able to support any CSS framework or component library.
- Quanta won't be based on ANY framework CSS or component library.
- Although, we might be inherit and adopt some basic component from out there.
- Legacy way of themeing is simply another use case, Theme bundle using SemanticUI.
- Remove SemanticUI use from key places, use Quanta components as base instead.

## Tasks

- Assess the current SemanticUI component CSS and separate them into the support bundle.
- The support bundle should be configurable and extensible and additional SemanticUI components should be able to be added to the support bundle.
- Make the CMSUI conditional, lazy loaded.
- Make work the current version with the new three bundles.

## Stages

- Removing SemanticUI build, I still can use the CMSUI
- Quanta CMSUI basic, loaded lazily and on demand
- Theme use Quanta basic
- Theme use Quanta full
- Quanta CMSUI full

## Roadmap

### Plone 6

- Blocks chooser button position as Quanta
- ...

### Plone 7

- Full Quanta system

## Semantic UI

We cannot improve SemanticUI (at least not easily), to include the missing accessibility features. Using SemanticUI in Volto in the beginning was good as we have a good swiss knife toolkit and components pool to quickly use it in a project or in Volto itself. However, it's huge (both in JS and in CSS) and the resultant bundle size is quite big because of it.

SemanticUI theming engine proved to be good but overwhelming for newbies. Even experienced frontend developers end up in relying in good old plain CSS using the `custom.overrides` facility to theme their projects.

## SemanticUI components used in core

- Button (57)
- Container (46)
- Segment (37)
- Form (28)
- Grid (23)
- Input (21)
- Table (18)
- Message (14)
- Header (12)
- Icon (11)
- Image (10)
- Label (10)
- Dropdown (9)
- Menu (8)
- List (8)
- Accordion (8)
- Dimmer (7)
- Loader (6)
- Popup (5)
- Checkbox (5)
- Confirm (5)
- Modal (4)
- Breadcrumb (3)
- Tab (3)
- Radio (3)
- Pagination (2)
- Embed (2)
- Divider (2)
- TextArea (2)
- Comment (1)
- GridColumn (1)

## Roadmap

- Widgets
- Buttons
- Toolbar
- Blocks Engine UX/UI
- Add menu
- Add block menu
- Sidebar UX/UI
