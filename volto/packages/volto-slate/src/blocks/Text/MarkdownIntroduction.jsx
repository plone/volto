import { Segment, List } from 'semantic-ui-react';
import React from 'react';

/**
 * A component to be shown in the sidebar as a introduction to the Markdown support in the Slate-based Text block. It renders a header and a list and has no state.
 * @param {object} props Can be an empty object (no props are used in this component).
 */
const MarkdownIntroduction = (props) => {
  return (
    <div>
      <header className="header">
        <h2>Markdown shortcuts</h2>
      </header>

      <Segment secondary attached style={{ fontFamily: 'monospace' }}>
        <List>
          <List.Item key={1} style={{ fontSize: 'xx-large' }}>
            ## Heading
          </List.Item>
          <List.Item key={2} style={{ fontSize: 'x-large' }}>
            ### Subheading
          </List.Item>

          <List.Item key={3} style={{ paddingTop: '1rem' }}>
            * unordered list item
          </List.Item>
          <List.Item key={4}>+ unordered list item</List.Item>
          <List.Item key={5}>- unordered list item</List.Item>

          <List.Item key={6} style={{ paddingTop: '1rem' }}>
            1. ordered list item
          </List.Item>
          <List.Item key={7}>1) ordered list item</List.Item>

          <List.Item key={8} className="callout">
            &gt; block quote
          </List.Item>
          <List.Item key={9} style={{ fontWeight: 'bold' }}>
            **bold text**
          </List.Item>
          <List.Item key={10} style={{ fontWeight: 'bold' }}>
            __bold text__
          </List.Item>
          <List.Item key={11} style={{ fontStyle: 'italic' }}>
            *italic text*
          </List.Item>
          <List.Item key={12} style={{ fontStyle: 'italic' }}>
            _italic text_
          </List.Item>
          <List.Item key={13} style={{ textDecoration: 'line-through' }}>
            ~~strikethrough text~~
          </List.Item>
        </List>
      </Segment>
    </div>
  );
};

export default MarkdownIntroduction;
