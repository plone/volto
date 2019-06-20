# Accessibility Guidelines

Attention points to improve and maintain accessibility. In documentation, code and filenames you will often see this abbreviated as "a11y".

## Clickable Elements That have a symbol or icon and no visible text

If the symbol or icon is clear enough for sighted users, for instance a big "X" to close a dialog, it will still need a text for screen reader users.

You can achieve a 'hidden' label by setting the property "aria-label" on the element.
If available, use the translation machinery available to make the label appear in the correct language.

Example:

```jsx noeditor
<button className="cancel" aria-label="Cancel" onClick={() => this.onCancel()}>
  <Icon
    name={clearSVG}
    className="circled"
    size="32px"
    title={this.props.intl.formatMessage(messages.cancel)}
  />
</button>
```
