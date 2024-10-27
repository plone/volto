# Shadow a component or module

Component or module shadowing is a technique that allows you to define an alternative module for a specific module.
You normally would want to override a module from another add-on.
This add-on should not be transpiled.

This technique relies on the `resolve.alias` feature of the bundlers, so the module is effectively being replaced by the alternative one supplied.
You will need to modify some imports in the alternative module to comply with the new placement and convert relative imports to absolute ones.

To override the component, first, you should identify the component you want to shadow in the package.
Then, replicate the same folder structure that the original component has in the source code and place it inside the `customizations` folder of your add-on.

Start by using the name of the package you want to shadow.
If the package has a namespace, then use a folder to define it.

To identify a component to shadow, you can use several approaches.
The primary method uses [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).
You can inspect the app and find out the name of the component (the name
of the tag), then search for it in the source code.
Alternatively, you can browse the contents of the source package you want to shadow by searching for it inside {file}`node_modules` of your app folder.


## Example: customize the `Logo` resource

To replace the `Logo` resource, your folder structure needs to match the folder structure of the package in the `customizations` folder.
The `Logo` resource is located in the `@plone/slots` package in the {file}`components/Logo/Logo.svg` file.
The final path of your new component will be {file}`src/customizations/@plone/slots/components/Logo/Logo.svg`.

```{warning}
When upgrading add-ons in your project, it's important to review any shadowed components from the updated add-on.
Changes in the add-on's public API could potentially break your application.
Ensure that your shadowed components are updated to align with the new specifications of the original module.
```
