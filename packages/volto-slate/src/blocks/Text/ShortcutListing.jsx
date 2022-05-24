import { Segment, List } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import React from 'react';

const ShortcutListing = (props) => {
  const hotkeys = config.settings?.slate?.hotkeys;
  return (
    <div>
      <header className="header">
        <h2>Editor shortcuts</h2>
      </header>

      <Segment secondary attached>
        <List>
          <List.Item>
            Type a slash (<em>/</em>) to change block type
          </List.Item>
          {Object.entries(hotkeys || {}).map(([shortcut, { format, type }]) => (
            <List.Item key={shortcut}>{`${shortcut}: ${format}`}</List.Item>
          ))}
        </List>
        <div>On Windows, the MOD key is Ctrl, on Mac OS X it's Cmd.</div>
      </Segment>
    </div>
  );
};

export default ShortcutListing;
