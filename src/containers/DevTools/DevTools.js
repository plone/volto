/**
 * Dev tools container.
 * @module containers/DevTools
 */

import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

/**
 * This constant renders the dev tools.
 * @constant DevTools
 */
export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-H" changePositionKey="ctrl-Q">
    <LogMonitor />
  </DockMonitor>
);
