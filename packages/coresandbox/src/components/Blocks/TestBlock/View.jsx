import React from 'react';

const TestBlockView = (props) => {
  return (
    <div className="test-block">
      <div>Test Block</div>
      <p>{JSON.stringify(props.data)}</p>
    </div>
  );
};

export default TestBlockView;
