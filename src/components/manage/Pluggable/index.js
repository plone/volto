// ported to JS from MIT licensed https://github.com/robik/react-view-slot
// We've renamed Slot => Pluggable, not to clash with Volto slots

import React from 'react';
import sortBy from 'lodash.sortby';

export const context = React.createContext();

export function usePluggable(name) {
  const ctx = React.useContext(context);

  if (!ctx) {
    throw new Error(
      'Using <Pluggable> component or usePluggable hook outside of <PluggablesProvider>',
    );
  }

  return ctx.pluggables[name] || [];
}

/**

The Pluggables components give you insertion points to push components to other
components in an "out of tree" fashion, similar to React's <Portal> component.

To understand it, let's look at the architecture:

- First, we need to wrap all of our React component tree in a PluggablesProvider:

```
  <PluggablesProvider>
    ...
  </PluggablesProvider>
```

This Provider acts like a centralized place where "insertion points" and
"plugins to the insertion points" can be can be registered.

Now, inside the components tree of our PluggablesProvider we can insert the
"insertion points":

```
<Pluggable name="left-column" />
```

And now we can simply plug things as children to the <Pluggable> with a <Plug>
component:

```
<Plug pluggable="left-column" id="navigation">relevant nav stuff</Plug>
```

Declaring a <Plug> with the same id two times will make the second one (in
terms of rendering order) replace the first one.

You can also pass options to the Plugs, to enable inter-component communication:

```
<Pluggable name="block-toolbar" params={...blockProps} />
```

To use the passed params, you can do:

```
<Plug pluggable="block-toolbar" id="style">
{({options}) => {
  console.log(options);
  return <Button>Clickme</Button>
}}
</Plug>

You can also customize how the pluggables are rendered:

<Pluggable name="block-toolbar">
{(pluggables) => pluggables.map(p => <div>{p}</div>)
</Pluggable>
**/
export function Pluggable(props) {
  const { name, maxCount, reversed, children, params } = props; // , ...rest
  let pluggables = usePluggable(name);

  if (maxCount !== undefined) {
    pluggables = pluggables.slice(0, maxCount);
  }
  if (reversed !== undefined) {
    pluggables = [...pluggables].reverse();
  }

  if (params && children) {
    throw Error(
      'Cannot specify render function and params props at the same time',
    );
  }

  return React.useMemo(() => {
    if (children) {
      return children(pluggables);
    }

    return React.createElement(
      React.Fragment,
      {},
      pluggables.map((R, i) =>
        React.createElement(R, { key: i.toString(), ...params }),
      ),
    );
  }, [params, pluggables, children]);
}

export function usePlug({ pluggable, id, renderer, dependencies, options }) {
  const pluggableContext = React.useContext(context);
  if (!pluggableContext) {
    throw new Error(
      'Using <Plug> component or usePlug hook outside of <PluggablesProvider>',
    );
  }
  const { setPlug, removePlug } = pluggableContext;
  const { name, order, extra } = options;

  Object.assign(renderer, { pluggableName: name, extra, order });

  React.useEffect(
    () => {
      setPlug(pluggable, id, renderer);
      return () => removePlug(pluggable, id);
    },
    dependencies, // eslint-disable-line react-hooks/exhaustive-deps
  );
}

export const Plug = ({
  pluggable,
  id,
  dependencies = [],
  children,
  ...options
}) => {
  const renderer = typeof children === 'function' ? children : () => children;
  usePlug({ pluggable, id, renderer, dependencies, options });
  return null;
};

export function createPluggable(name) {
  const pluggable = (props) =>
    React.createElement(Pluggable, { name, ...props });
  pluggable.pluggableName = name;
  pluggable.Plug = createPlugComponent(name);
  return pluggable;
}

function createPlugComponent(pluggableName) {
  const plugComponent = (props) =>
    React.createElement(Plug, { pluggable: pluggableName, ...props });
  plugComponent.displayName = `Pluggables(${pluggableName})`;
  return plugComponent;
}

/**
 * Creates a Pluggable + Plug pair
 */
export function createPluggableAndPlug(name) {
  const boundPluggable = createPluggable(name);
  return [boundPluggable, boundPluggable.Plug];
}

export const PluggablesProvider = ({ children }) => {
  const setPlug = (pluggable, id, renderer) => {
    Object.assign(renderer, { id });

    setPluggables((prevState) => ({
      ...prevState,
      pluggables: {
        ...prevState.pluggables,
        [pluggable]: sortBy(
          [
            ...(prevState.pluggables[pluggable] || []).filter(
              (e) => e.id !== id,
            ),
            renderer,
          ],
          (e) => e.order || 0,
        ),
      },
    }));
  };

  const removePlug = (pluggable, name) => {
    setPluggables((prevState) => ({
      ...prevState,
      pluggables: {
        ...prevState.pluggables,
        [pluggable]: sortBy(
          (prevState.pluggables[pluggable] || []).filter((e) => e.id !== name),
          (e) => e.order || 0,
        ),
      },
    }));
  };

  const initialPluggables = {
    pluggables: {},
    setPlug,
    removePlug,
  };

  const [pluggables, setPluggables] = React.useState(initialPluggables);
  return React.createElement(context.Provider, { value: pluggables }, children);
};
