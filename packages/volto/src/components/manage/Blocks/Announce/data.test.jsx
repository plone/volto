import { render, screen, fireEvent } from '@testing-library/react';
import AnnounceData from './data';
import '@testing-library/jest-dom';

const mockData = {
  title: 'Test Title',
  description: 'Test Description',
  buttonText: 'Test Button',
  link: '/test-link',
};

const mockBlocksConfig = {
  blocks: {
    blocksConfig: {
      '@plone/volto/components/Blocks/Text': {},
    },
  },
};

describe('AnnounceData Component', () => {
  it('renders the AnnounceData component with provided data', () => {
    const onChangeBlock = jest.fn();

    render(
      <AnnounceData
        data={mockData}
        block="123"
        onChangeBlock={onChangeBlock}
        blocksConfig={mockBlocksConfig}
      />,
    );

    // Check if the form fields are rendered with correct values
    expect(screen.getByLabelText('Title')).toHaveValue('Test Title');
    expect(screen.getByLabelText('Description')).toHaveValue(
      'Test Description',
    );
    expect(screen.getByLabelText('Button Text')).toHaveValue('Test Button');
    expect(screen.getByLabelText('Link')).toHaveValue('/test-link');
  });

  it('calls onChangeBlock when form fields are updated', () => {
    const onChangeBlock = jest.fn();

    render(
      <AnnounceData
        data={mockData}
        block="123"
        onChangeBlock={onChangeBlock}
        blocksConfig={mockBlocksConfig}
      />,
    );

    // Find and interact with an input field using fireEvent
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    // Check if onChangeBlock is called with the updated data
    expect(onChangeBlock).toHaveBeenCalledWith('123', {
      ...mockData,
      title: 'Updated Title',
    });
  });
});
