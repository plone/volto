import { Segment, List } from 'semantic-ui-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * A component to be shown in the sidebar as a introduction to the Markdown support in the Slate-based Text block. It renders a header and a list and has no state.
 * @param {object} props Can be an empty object (no props are used in this component).
 */
const MarkdownIntroduction = (props) => {
  return (
    <div>
      <header className="header">
        <h2>
          <FormattedMessage
            id="Markdown shortcuts"
            defaultMessage="Markdown shortcuts"
          />
        </h2>
      </header>

      <Segment secondary attached style={{ fontFamily: 'monospace' }}>
        <List>
          <List.Item key={1} style={{ fontSize: 'xx-large' }}>
            <FormattedMessage id="## Heading" defaultMessage="## Heading" />
          </List.Item>
          <List.Item key={2} style={{ fontSize: 'x-large' }}>
            <FormattedMessage
              id="### Subheading"
              defaultMessage="### Subheading"
            />
          </List.Item>

          <List.Item key={3} style={{ paddingTop: '1rem' }}>
            <FormattedMessage
              id="* Unordered list item"
              defaultMessage="* Unordered list item"
            />
          </List.Item>
          <List.Item key={4}>
            <FormattedMessage
              id="+ Unordered list item"
              defaultMessage="+ Unordered list item"
            />
          </List.Item>
          <List.Item key={5}>
            <FormattedMessage
              id="- Unordered list item"
              defaultMessage="- Unordered list item"
            />
          </List.Item>

          <List.Item key={6} style={{ paddingTop: '1rem' }}>
            <FormattedMessage
              id="1. Ordered list item"
              defaultMessage="1. Ordered list item"
            />
          </List.Item>
          <List.Item key={7}>
            <FormattedMessage
              id="1) Ordered list item"
              defaultMessage="1) Ordered list item"
            />
          </List.Item>

          <List.Item key={8} className="callout">
            <FormattedMessage
              id="&gt; Block quote"
              defaultMessage="&gt; Block quote"
            />
          </List.Item>
          <List.Item key={9} style={{ fontWeight: 'bold' }}>
            <FormattedMessage
              id="**Bold text**"
              defaultMessage="**Bold text**"
            />
          </List.Item>
          <List.Item key={10} style={{ fontWeight: 'bold' }}>
            <FormattedMessage
              id="__Bold text__"
              defaultMessage="__Bold text__"
            />
          </List.Item>
          <List.Item key={11} style={{ fontStyle: 'italic' }}>
            <FormattedMessage
              id="*Italic text*"
              defaultMessage="*Italic text*"
            />
          </List.Item>
          <List.Item key={12} style={{ fontStyle: 'italic' }}>
            <FormattedMessage
              id="_Italic text_"
              defaultMessage="_Italic text_"
            />
          </List.Item>
          <List.Item key={13} style={{ textDecoration: 'line-through' }}>
            <FormattedMessage
              id="~~Strikethrough text~~"
              defaultMessage="~~Strikethrough text~~"
            />
          </List.Item>
        </List>
      </Segment>
    </div>
  );
};

export default MarkdownIntroduction;
