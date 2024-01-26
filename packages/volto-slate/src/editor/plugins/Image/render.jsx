import React from 'react';

export const ImageElement = (props) => {
  const { attributes, children } = props;

  return (
    <span {...attributes} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
};
