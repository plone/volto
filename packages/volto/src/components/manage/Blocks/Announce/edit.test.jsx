import { render, screen, fireEvent } from '@testing-library/react';
import AnnounceEdit from './edit';

const mockData = {
  title: 'Test Title',
  description: 'Test Description',
  buttonLink: [{ '@id': '/test-link' }],
  buttonTitle: 'Test Button',
  image: [{ '@id': '/test-image' }],
  imageAlt: 'Test Alt Text',
};

describe('Edit Component', () => {
  it('renders the Edit component with provided data', () => {
    const onChangeBlock = jest.fn();

    render(
      <AnnounceEdit
        data={mockData}
        onChangeBlock={onChangeBlock}
        block="123"
        selected={false}
      />,
    );

    // Check if ReleaseView is rendered with correct props
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();

    // Check if ReleaseData is rendered with correct props
    const announceDataComponent = screen.getByText('Release Data');
    expect(announceDataComponent).toBeInTheDocument();
    expect(announceDataComponent).toHaveAttribute('data-block', '123');
  });

  it('calls onChangeBlock when AnnounceData is updated', () => {
    const onChangeBlock = jest.fn();

    render(
      <AnnounceEdit
        data={mockData}
        onChangeBlock={onChangeBlock}
        block="123"
        selected={false}
      />,
    );

    // Find and interact with an input field in ReleaseData using fireEvent
    const inputField = screen.getByLabelText('Title');
    fireEvent.change(inputField, { target: { value: 'Updated Title' } });

    // Check if onChangeBlock is called with the updated data
    expect(onChangeBlock).toHaveBeenCalledWith('123', {
      ...mockData,
      title: 'Updated Title',
    });
  });
});
