---
myst:
  html_meta:
    "description": "Known development watcher issues in Volto"
    "property=og:description": "Known development watcher issues in Volto"
    "property=og:title": "Known development watcher issues in Volto"
    "keywords": "Volto, development, watcher, inotify, webpack"
---

# Known development watcher issues

When developing Volto locally, you might encounter file watcher errors.
These errors are caused by operating system limits on the number of files that can be watched simultaneously.

The issue usually appears when running Volto in development mode.
It is more common on large projects or monorepos.

## Symptoms

You might see errors similar to the following.

```text
Error: ENOSPC: System limit for number of file watchers reached
```

Volto might stop recompiling changes.
Hot reloading might stop working.

## Cause

Volto uses file watchers to detect file changes during development.
Operating systems limit the number of files that can be watched at the same time.
When the limit is reached, new file watchers cannot be created.

## Solution

Increase the file watcher limit according to your operating system.

`````{tab-set}

````{tab-item} Linux
Increase the `inotify` watcher limit.

```shell
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
````

````{tab-item} macOS
Try increasing the maximum number of open files via `ulimit`.

```shell
ulimit -n 1048576
```
````

`````