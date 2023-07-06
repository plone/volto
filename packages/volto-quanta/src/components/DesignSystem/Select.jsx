import React from 'react';
import { Container } from 'semantic-ui-react';
import { SelectWidgetComponent as SelectWidget } from '../Select/SelectWidget';
import Input from '../Input/Input';

const DesignSystem = () => {
  return (
    <Container>
      <div style={{ width: '300px' }}>
        <SelectWidget
          id="SelectWidget"
          title="Select Field"
          choices={[
            ['Foo', 'Foo'],
            ['Bar', 'Bar'],
            ['Foo', 'Foo'],
          ]}
          description="Optional help text"
          placeholder="Type something…"
        />
      </div>
    </Container>
  );
};

export default DesignSystem;
