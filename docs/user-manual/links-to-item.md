---
myst:
  html_meta:
    "description": "User manual on how to find all links and relations to the current item."
    "property=og:description": "User manual on how to find all links and relations to the current item."
    "property=og:title": "Finding links and relations to the current item."
    "keywords": "Volto, Plone, frontend, React, User manual, links, relations, references, related content"
---

(links-to-item-label)=

# Finding links and references to the current page

```{versionadded} Volto 16.28.0
This feature was added in Volto 16.28.0, but it was disabled by default.
```

```{versionchanged} Volto 17.0.0-alpha.19
This feature is now enabled by default.
```

Sometimes it can be hard to keep track from where a certain page is referenced.
This is especially true whenever you want to reconstruct your website with a greater number of objects being moved or deleted.
For this situation, you can visit the {guilabel}`Links and references` page, which is an overview of all content items that reference a certain content item.

```{note}
An item references another item by creating a hyperlink to this item, using the item in a block, referencing it in the {guilabel}`Related Items` field, or referencing it in a relation field.
```

## {guilabel}`Links and references` view

In the toolbar on the left side, you can click on the item with the three horizontally aligned dots, called {guilabel}`More menu`.
Click then on the item labeled {guilabel}`Links and references`.

````{note}
If you do not see {guilabel}`Links and references`, then you either have a version of Volto that does not support this feature, or this feature has not been enabled on your site.
In either case, contact your site administrator for assistance.

```{seealso}
{term}`excludeLinksAndReferencesMenuItem`
```
````

You can see now a table displaying all links to and references of the current item.

```{image} ../_static/user-manual/manage/link-to-items.png
:alt: A panel captioned with "Content that links to or references 'Supervisor Adélaïde Pickavance'". Below the caption, there is a table with one section per relation type, where each section has three columns. The first column's heading is the relation name, the second is "Review State", and the third is "Type". The sections are named, from top to bottom, "Linking this item with hyperlink in text", "Referencing the item as related item", and "Referencing this item with '[Name of Relation]'".
```

For editors, this view gives insight to whether those links and references are still relevant.
On second sight, it also helps to prevent potential broken links and relations.

For example, when you try to delete this page with other pages linking to it, you will get a warning that this will cause broken links or relations that lead to a "not found" error page.
If you receive such a warning, you can inspect this view and go through each referencing page, removing any references.
