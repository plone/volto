---
title: Known development watcher issue
---

This document describes a known file watcher issue that can occur during Volto development.
It explains what you will observe when the issue happens.
It also provides guidance on how to resolve the problem.

## What you will see

When this issue occurs, the development server may stop unexpectedly.
File changes may no longer trigger rebuilds.
An error related to the file watcher limit can appear in the terminal.

## Why this happens

Operating systems enforce a limit on the number of files that can be watched simultaneously.
Larger Volto projects can exceed this limit during development.
When the limit is reached, the file watcher fails.

## How to fix the issue

The issue can be resolved by increasing the file watcher limit on your system.
After updating the limit, restart the development server.

## Increasing the watcher limit

On Linux and macOS, the watcher limit can be increased by adjusting system configuration values.
This is commonly done by increasing the maximum number of file watchers allowed by the operating system.
