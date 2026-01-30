# Troubleshooting (Development)

## Hot reload / watcher stops working

### Problem

When running Volto in development mode, file changes may stop triggering
automatic rebuilds or hot reload. You may notice that editing files no longer
updates the browser.

### Cause

This usually happens because the operating system has reached the maximum
number of files that can be watched. Volto uses Webpack and file watchers,
which can exceed default OS limits, especially in large projects.

### Solution

Increase the file watcher limits for your operating system.

---

### Linux (inotify)

Check current limit:

```bash
cat /proc/sys/fs/inotify/max_user_watches

