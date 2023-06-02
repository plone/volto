---
myst:
  html_meta:
    "description": "User manual on how to find all links and relations to the current item."
    "property=og:description": "User manual on how to find all links and relations to the current item."
    "property=og:title": "Finding links and relations to the current item."
    "keywords": "Volto, Plone, frontend, React, User manual, links, relations"
---

(links-to-item-label)=

# Finding links and relations to the current item

Sometimes it can be hard to keep track from where a certain page is referenced.
This is especially true whenever you want to reconstruct your website with a greater number of objects being moved or deleted.
For this situation, you can visit the {guilabel}`Links to item` page, which is an overview of all objects that refererence a certain object.

```{note}
An item references another item by creating a hyperlink to this item, using the item in a block, referencing it in the {guilabel}`Related Items` field, or referencing it in a relation field.
```

## {guilabel}`Links to item` view

In the toolbar on the left side, you can click on the item with the three horizontally aligned dots, called {guilabel}`More menu`.
Click then on the item labeled {guilabel}`Links to item`.

You can see now a table displaying all links to the current item.

```{image} ../_static/user-manual/manage/link-to-items.png
:alt: A panel captioned with "Links to My Summer Vacation - Day 2". A table with two columns (first column labeled with "Linking this item", second column labeled with "review state"). In the row appears a link titled "Links to My Summer Vacation - Day 1", because it is referencing the current item.
```

For editors, this view gives insight to whether those links are still relevant.
On second sight, it also helps to prevent potential broken links.

For example, when you try to delete this page with other pages linking to it, you will get a warning that this will cause broken links that lead to a "not found" error page.
If you receive such a warning, you can inspect this view and go through each referencing page, removing any references.