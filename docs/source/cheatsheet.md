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

```js hl_lines="1 3 12"
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

!!! example "Tabbed Code"

    ````
    ```Bash tab=
    #!/bin/bash
    STR="Hello World!"
    echo $STR
    ```

    ```C tab=
    #include

    int main(void) {
      printf("hello, world\n");
    }
    ```

    ```C++ tab=
    #include <iostream>

    int main() {
      std::cout << "Hello, world!\n";
      return 0;
    }
    ```

    ```C# tab=
    using System;

    class Program {
      static void Main(string[] args) {
        Console.WriteLine("Hello, world!");
      }
    }
    ```
    ````

    ```Bash tab=
    #!/bin/bash
    STR="Hello World!"
    echo $STR
    ```

    ```C tab=
    #include

    int main(void) {
      printf("hello, world\n");
    }
    ```

    ```C++ tab=
    #include <iostream>

    int main() {
      std::cout << "Hello, world!\n";
      return 0;
    }
    ```

    ```C# tab=
    using System;

    class Program {
      static void Main(string[] args) {
        Console.WriteLine("Hello, world!");
      }
    }
    ```

??? settings "Tabbed Code Setup"
    ```HTML tab=
    <div class="superfences-tabs">
    <input name="__tabs_1" type="radio" id="__tab_1_0" checked="checked">
    <label for="__tab_1_0">Tab 0</label>
    <div class="superfences-content">...</div>
    ...
    <input name="__tabs_1" type="radio" id="__tab_1_X" checked="checked">
    <label for="__tab_1_X">Tab X</label>
    <div class="superfences-content">...</div>
    ...
    </div>
    ```

    ```CSS tab=
    .superfences-tabs {
      display: flex;
      position: relative;
      flex-wrap: wrap;
    }

    .superfences-tabs .highlight {
      background: #ddd;
    }

    .superfences-tabs .superfences-content {
      display: none;
      order: 99;
      width: 100%;
    }

    .superfences-tabs label {
      width: auto;
      margin: 0 0.5em;
      padding: 0.25em;
      font-size: 120%;
      cursor: pointer;
    }

    .superfences-tabs input {
      position: absolute;
      opacity: 0;
    }

    .superfences-tabs input:nth-child(n+1) {
      color: #333333;
    }

    .superfences-tabs input:nth-child(n+1):checked + label {
        color: #FF5252;
    }

    .superfences-tabs input:nth-child(n+1):checked + label + .superfences-content {
        display: block;
    }
    ```

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
