import React from 'react';
import { useSelected, useFocused } from 'slate-react';
import { Image } from '@plone/volto/components';

export const ImageElement = (props) => {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();

  const style = {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '20em',
    boxShadow: selected && focused ? '0 0 0 2px blue' : 'none',
  };

  return (
    <span {...attributes} style={{ display: 'inline-block' }}>
      {children}
      <Image alt="" src={element.url} style={style} />
    </span>
  );
};
