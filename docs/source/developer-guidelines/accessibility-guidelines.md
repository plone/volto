---
myst:
  html_meta:
    "description": "Accessibility guidelines in Volto"
    "property=og:description": "Accessibility guidelines in Volto"
    "property=og:title": "Accessibility guidelines"
    "keywords": "Volto, Plone, frontend, React, Accessibility, guidelines, a11y"
---

# Accessibility guidelines

Attention should be paid to improve and maintain accessibility. In documentation, code and filenames you will often see this abbreviated as "a11y".

## Clickable elements that have a symbol or icon and no visible text

If the symbol or icon is clear enough for sighted users, for instance a big "X" to close a dialog, it will still need a text for screen reader users.

You can achieve a 'hidden' label by setting the property "aria-label" on the element.
If available, use the translation machinery available to make the label appear in the correct language.

Example:

```jsx
<button className="cancel" aria-label="Cancel" onClick={() => this.onCancel()}>
  <Icon
    name={clearSVG}
    className="circled"
    size="30px"
    title={this.props.intl.formatMessage(messages.cancel)}
  />
</button>
```

## Do not use `<a>` tags without href

If an element has an event listener on it and performs an action, but does not point to a proper URL, use a `<button>` and style with CSS to style.
The reasoning is that the `<a></a>` HTML tag has specific behavior that screenreaders support and that screenreader users expect.

## Make sure form elements have a label

This is true for one-element forms as well, such as the "Search" form on the folder-contents component. Putting an icon on it does not convey any meaning to screenreader-users, you should clarify it with an aria-label.
