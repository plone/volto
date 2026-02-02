import { Segment, List } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ShortcutListing = (props) => {
  const hotkeys = config.settings?.slate?.hotkeys;
  return (
    <div>
      <header className="header">
        <h2>
          <FormattedMessage
            id="Editor shortcuts"
            defaultMessage="Editor shortcuts"
          />
        </h2>
      </header>

      <Segment secondary attached>
        <List>
          <List.Item>
            <FormattedMessage
              id="Type a slash (<em>/</em>) to change block type"
              defaultMessage="Type a slash (<em>/</em>) to change block type"
            />
          </List.Item>
          {Object.entries(hotkeys || {}).map(([shortcut, { format, type }]) => (
            <List.Item key={shortcut}>{`${shortcut}: ${format}`}</List.Item>
          ))}
        </List>
        <div>
          <FormattedMessage
            id="On Windows, the MOD key is CTRL, on macOS it's CMD."
            defaultMessage="On Windows, the MOD key is CTRL, on macOS it's CMD."
          />
        </div>
      </Segment>
    </div>
  );
};

export default ShortcutListing;
