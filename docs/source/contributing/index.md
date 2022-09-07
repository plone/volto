---
myst:
  html_meta:
    "description": "Volto design principles"
    "property=og:description": "Volto design principles"
    "property=og:title": "Design principles"
    "keywords": "Volto, Plone, frontend, React, contributing, design principles"
---

# Design principles

```{toctree}
:maxdepth: 1

guidelines

```

Since the very beginning, Volto has been developed with a set of principles in mind,
brought from the years of experience developing [Plone](https://plone.org "Link to website of Plone") core and implementing projects on it.

- Approachability
- Developer experience first
- Volto UI/UX is Pastanaga UI
- Do not overengineer things
- Each feature has only one way of doing it
- Frontend and backend are meant to be decoupled
- Focus on the UI/UX implementation and upcoming challenges

Following you can find the reasoning behind these principles.

## Approachability

Volto has to be 100% approachable by someone with zero Plone or Python knowledge.
This is the main Volto principle.

That means this someone has to be able to run, test and use Volto (and thus Plone), and
ultimately customize a simple project without any problem and without having to touch
Plone by any means or write a single line of Python nor implement a single Plone add-on
product.

This person has to be able of using only JavaScript to parameterize it.

The rationale behind this is to be able to attract people from the React community or
other communities and drag them to use and know Plone using Volto as a facilitator.
This way we keep the existing learning curve coming from Plone away from Volto, so Volto can
make (and control) from scratch its own learning curve, without any inherited burden.

A number of decisions have been made based on this directive.

To give an example, that's why it was decided not to use the tiles implementation and definitions existing in the
Plone ecosystem.
We started to do it, but all of a sudden it felt like duplicating efforts by defining them on both sides,
while clearly, having them defined on Plone didn't give any value.

## Developer experience first

Developing in Volto has to be fun, not a burden.
Implementing or customizing anything in Volto (or in a Volto project) should be effortless, straightforward,
and done in a single way.

Developing for Plone has become a burden, even doing the most simple thing often implies
teaching several other things and technologies, and explain the reasoning (and the
history!) behind why it is like that, and worse, often say sorry about it.

Those who teach Plone out there know it's like this.
Almost twenty years of history, thousands of different developers, improvements, deprecations,
introduction of new technologies, and removal of them in such a big and old project is normal it's like it is,
nobody is to take the blame on it.

In Volto we have a blank page in front of us.
Let's work to keep it clean and shiny.

## Volto UI/UX is Pastanaga UI

Volto has its own UI/UX design, it's Pastanaga UI.
It was conceived from scratch to match nowadays trends and to give fresh air what a content management system user
experience should be.

## Do not overengineer things

In the Plone community we had a tendency to overengineer things.
We have the chance to stop doing it.
While developing Volto we live in the Web Technologies world, let's use them in a clear and straightforward way.

Do not try to implement ZCA, Portlets or five way adapters for widgets in JavaScript.

## Each feature has only one way of doing it

We won't introduce (at least willingly) several ways of doing the same thing.
Then you have to document them both, and explain to the user which is the best.
Especially in cases where you do something in the backend or in the frontend.

## Frontend and backend are meant to be decoupled

So let's them keep them decoupled.

In the future, while developing Volto and in our Volto projects, we will face a lot of
decisions and answer questions like:

- What is the value to define something in the backend?
- Is that going to improve the (frontend) developer experience?
- Is separating this going to do any good or will it force us to repeat ourselves?
- or worse, it would take two people (frontend dev and a backend dev) to accomplish a simple task?
- Are we introducing two different ways of doing things?

## Focus on the UI/UX implementation and upcoming challenges

Volto is a frontend UI implementation of a CMS backend.
We need to focus on this instead of focusing on the relationship with the backend(s).
JavaScript world advances quick, and we have to keep pace with it.

React's own async (Suspense) mode it's on its way, and that will change enough
things in React world and we have to keep up with these changes.
