# Component registry

The configuration registry stores a component registry in itself.
The component registry is a mapping of names to components.
You can look up a name, and receive a component that you can reference in your code.
This provides an alternative, and more convenient, way to customize components in a pluggable way.

You can programmatically override such registrations from your add-on or projects because it's stored in the configuration registry.
You can customize a component without using shadowing at all, if the code that uses the component retrieves from the component registry, rather than import it directly.
You can even have modifiers to the component registrations through dependencies.
Thus you can adapt the call, given an array of such dependencies.
