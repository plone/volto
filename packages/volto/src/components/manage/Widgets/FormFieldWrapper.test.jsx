import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import FormFieldWrapper from './FormFieldWrapper';

const mockStore = configureStore();

describe('FormFieldWrapper', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const Wrapper = (props) => (
    <Provider store={store}>
      <FormFieldWrapper {...props}>
        <div className="child">Child</div>
      </FormFieldWrapper>
    </Provider>
  );

  it('renders default layout without onEdit', () => {
    const { container } = render(
      <Wrapper id="test-field" title="Test Field" fieldSet="default" />,
    );
    // Label column (4) + Field column (8) = 2 columns
    expect(container.querySelectorAll('.column').length).toBe(2);
    expect(container.querySelector('.four.wide.column')).not.toBeNull();
    expect(container.querySelector('.eight.wide.column')).not.toBeNull();
  });

  it('renders toolbar in correct layout when onEdit is provided', () => {
    const { container } = render(
      <Wrapper
        id="test-field"
        title="Test Field"
        fieldSet="default"
        onEdit={() => {}}
      />,
    );
    // Label (4) + Field (8) = 2 columns (Field column contains flex wrapper)
    const columns = container.querySelectorAll('.column');
    expect(columns.length).toBe(2);

    expect(columns[0].className).toContain('four wide');
    expect(columns[1].className).toContain('eight wide');

    // Check toolbar existence
    expect(container.querySelector('.toolbar')).not.toBeNull();
  });

  it('renders correct widths for single column layout with onEdit', () => {
    const { container } = render(
      <Wrapper
        id="test-field"
        title="Test Field"
        fieldSet="default"
        columns={1}
        onEdit={() => {}}
      />,
    );
    // Field (12) containing flex wrapper
    const columns = container.querySelectorAll('.column');
    expect(columns.length).toBe(1); // 1 column layout in grid row
    expect(columns[0].className).toContain('twelve wide');
    expect(container.querySelector('.toolbar')).not.toBeNull();
  });

  it('does not render toolbar column if field is disabled', () => {
    const { container } = render(
      <Wrapper
        id="test-field"
        title="Test Field"
        fieldSet="default"
        onEdit={() => {}}
        isDisabled={true}
      />,
    );
    // Label (4) + Field (8) = 2 columns
    const columns = container.querySelectorAll('.column');
    expect(columns.length).toBe(2);
    expect(columns[0].className).toContain('four wide');
    expect(columns[1].className).toContain('eight wide');
  });
});
