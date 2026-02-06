---
myst:
  html_meta:
    "description": "An introduction to React for Volto developers, covering component types and learning resources."
    "property=og:description": "An introduction to React for Volto developers, covering component types and learning resources."
    "property=og:title": "React"
    "keywords": "Volto, Plone, frontend, React, components, hooks"
---

# React

```{note}
This documentation is a work in progress.
Any help is welcome to fill in the gaps!
```

Volto, the frontend for Plone, is built with {term}`React`.
Understanding React fundamentals is essential for developing with Volto.
This chapter provides an introduction to React concepts relevant to Volto development.


## React learning resources

If you are new to React, the following resources will help you get started.

-   [React Official Documentation](https://react.dev/)
-   [React Tutorial](https://react.dev/learn)
-   [Thinking in React](https://react.dev/learn/thinking-in-react)


## Component types in Volto

React supports two types of components: Class Components and Function Components.

Volto's codebase contains both types.
Older parts of Volto use Class Components, while newer code uses Function Components with {term}`hooks`.

For new code, Function Components with hooks are preferred.

### Function Components

Function Components are JavaScript functions that return JSX.
They use hooks to manage state and side effects.

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```

### Class Components

Class Components extend `React.Component` and use lifecycle methods.
You will encounter these in older parts of Volto.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```


## React hooks in Volto

Volto uses React hooks extensively for state management and side effects.

Common hooks you will encounter include `useState`, `useEffect`, `useRef`, `useMemo`, and `useCallback`.

For global state management, Volto uses Redux hooks such as `useSelector` and `useDispatch`.
See {doc}`redux` for details on how Volto handles global state.

Volto also provides custom hooks for common tasks, such as `useClient` for detecting client-side rendering and `usePrevious` for tracking previous values.
You can find these in the {file}`packages/volto/src/hooks` and {file}`packages/volto/src/helpers/Utils` directories.
