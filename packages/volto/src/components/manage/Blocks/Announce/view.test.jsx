import { render, screen } from '@testing-library/react';
import AnnounceView from './view';

const mockData = {
  title: 'Test Title',
  description: 'Test Description',
  buttonLink: [{ '@id': '/test-link' }],
  buttonTitle: 'Test Button',
  image: [{ '@id': '/test-image' }],
  imageAlt: 'Test Alt Text',
};

describe('AnnounceView Component', () => {
  it('renders the component with provided data', () => {
    render(<AnnounceView data={mockData} />);

    // Check if title, description, and button are rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();

    // Check if image is rendered
    const image = screen.getByAltText('Test Alt Text');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/test-image/@@images/image');
  });

  it('renders UniversalLink with correct href and openInNewTab prop', () => {
    render(<AnnounceView data={mockData} />);

    // Check if UniversalLink is rendered with correct props
    const link = screen.getByText('Test Button');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test-link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveClass('button-link');
  });
});
