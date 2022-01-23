---
html_meta:
  "description": ""
  "property=og:description": ""
  "property=og:title": ""
  "keywords": ""
---

# Cheatsheet

https://python-markdown.github.io/extensions/
https://facelessuser.github.io/pymdown-extensions/extensions/

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

```{danger} Don't try this at home
```

```{seealso}
This is a see also section
```

```{deprecated} 13
This is an admonition box without a title.
```

## Links

Magic link https://volto.kitconcept.com

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
  def asdas:
  """ """
```

## Toggle paragraph (Exercises / FAQ)

````{admonition} This is a title
:class: toggle

```{code-block} python
:linenos:
:emphasize-lines: 1, 3

a = 2
print("my 1st line")
print(f"my {a}nd line")
```
````
