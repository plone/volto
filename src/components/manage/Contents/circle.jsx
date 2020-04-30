import React from 'react';
const Circle = ({ color }) => (
  <svg height="10" width="10" style={{ marginRight: 5 }}>
    <circle cx="5" cy="5" r="4" fill={color || '#51aa55'} />
  </svg>
);

export default Circle;
