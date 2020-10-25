# Cheatsheet

https://python-markdown.github.io/extensions/
https://facelessuser.github.io/pymdown-extensions/extensions/

Admonition

!!! note
    You should note that the title will be automatically capitalized.

!!! danger "Don't try this at home"
    ...

!!! important ""
    This is an admonition box without a title.

!!! tip "This is a tip"
    This is an admonition box without a title.

!!! check "This is a check"
    This is an admonition box without a title.

!!! cite "This is a cite"
    This is an admonition box without a title.

!!! question "This is a question"
    This is an admonition box without a title.

!!! example "This is a example"
    This is an admonition box without a title.

!!! warning "This is a warning"
    This is an admonition box without a title.

!!! bug "This is a bug"
    This is an admonition box without a title.

Magic link https://volto.kitconcept.com @sneridagh

:smile: :heart: :thumbsup:

```jsx hl_lines="1 3 12"
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

=== "Tab 1"
    Markdown **content**.

    Multiple paragraphs.

=== "Tab 2"
    More Markdown **content**.

    - list item a
    - list item b

Task List

- [X] item 1
    * [X] item A
    * [ ] item B
        more text
        + [x] item a
        + [ ] item b
        + [x] item c
    * [X] item C
- [ ] item 2
- [ ] item 3


???+ note "Open styled details"

    ??? danger "Nested details!"
        And more content again.

??? success "asdasd"
    Content.

??? warning classes
    Content.
