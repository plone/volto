import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const DesignSystem = () => {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/designsystem/input">Input</Link>
        </li>
        <li>
          <Link to="/designsystem/textarea">Textarea</Link>
        </li>
        <li>
          <Link to="/designsystem/select">Select</Link>
        </li>
      </ul>
    </Container>
  );
};

export default DesignSystem;
