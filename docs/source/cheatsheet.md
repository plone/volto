---
myst:
  html_meta:
    "description": "Cheatsheet for MyST and reStructuredText syntax"
    "property=og:description": "Cheatsheet for MyST and reStructuredText syntax"
    "property=og:title": "Cheatsheet"
    "keywords": "Volto, Plone, frontend, React, MyST, reStructuredText, syntax"
---

```{eval-rst}
:orphan:
```

# Cheatsheet

```{seealso}
{doc}`plone:contributing/myst-reference`
```


## Admonition

```{note}
You should note that the title will be automatically capitalized.
```

```{important}
This is an admonition box without a title.
```

```{tip}
This is an admonition box without a title.
```

```{warning}
This is an admonition box without a title.
```

```{danger}
Don't try this at home.
```

```{seealso}
This is a see also section.
```

```{deprecated} 13
This is an admonition box without a title.
```


## Links

Magic link (bare URLs via `linkify` Sphinx extension)

https://volto.kitconcept.com

Link to a file in the documentation.

{doc}`index`


(volto-demo-label)=

### Link to an arbitrary target

This requires setting up a label above a heading, then using MyST syntax to create a link to that label.

Click the reference {ref}`volto-demo-label` to jump to the target.


## Code

```{code-block} jsx
:linenos:
:emphasize-lines: 1, 3, 12

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      this.props.messages && (
        <Container className="messages">
          {map(this.props.messages, (message, index) => (
            <Message
              key={message.id}
              value={index}
              onDismiss={this.onDismiss}
              error={message.level === 'error'}
              success={message.level === 'success'}
              warning={message.level === 'warning'}
              info={message.level === 'info'}
              header={message.title}
              content={message.body}
            />
          ))}
        </Container>
      )
    );
  }
);
```

```python
def somefunction:
"""mydocstring"""
    pass
```
