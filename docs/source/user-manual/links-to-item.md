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

Sometimes it can be hard to keep track from where a certain page is referenced.
This is especially true whenever you want to reconstruct your website with a greater number of objects being moved or deleted.
For this situation, you can visit the {guilabel}`Links and references` page, which is an overview of all content items that refererence a certain content item.

```{note}
An item references another item by creating a hyperlink to this item, using the item in a block, referencing it in the {guilabel}`Related Items` field, or referencing it in a relation field.
```

## {guilabel}`Links and references` view

In the toolbar on the left side, you can click on the item with the three horizontally aligned dots, called {guilabel}`More menu`.
Click then on the item labeled {guilabel}`Links and references`.

You can see now a table displaying all links and references to the current item.

```{image} ../_static/user-manual/manage/link-to-items.png
:alt: A panel captioned with "Links and references to 'My Summer Vacation - Day 2'". A table with three columns (first column labeled with "Linking / referencing this item…", second column labeled with "Review state", third column labeled with "Type"). In the row appears a link titled "Links to My Summer Vacation - Day 1", because it is referencing the current item.
```

For editors, this view gives insight to whether those links and references are still relevant.
On second sight, it also helps to prevent potential broken links and relations.

For example, when you try to delete this page with other pages linking to it, you will get a warning that this will cause broken links or relations that lead to a "not found" error page.
If you receive such a warning, you can inspect this view and go through each referencing page, removing any references.