import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import config from '@plone/registry';
import { Component } from './Component';

const MockButton = ({ label }: { label?: string }) => (
  <button data-testid="mock-button">{label ?? 'Button'}</button>
);

const MockCard = ({ title }: { title?: string }) => (
  <div data-testid="mock-card">{title}</div>
);

beforeEach(() => {
  config.set('components', {});
  config.set('slots', {});
  config.set('utilities', {});
});

describe('Component', () => {
  it('renders a registered component by name', () => {
    config.registerComponent({ name: 'Button', component: MockButton });
    render(
      <Component<{ label?: string }> componentName="Button" label="Click me" />,
    );
    expect(screen.getByTestId('mock-button')).toHaveTextContent('Click me');
  });

  it('returns null and warns for an unregistered component', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Component componentName="Foo" />);
    expect(container.firstChild).toBeNull();
    expect(warn).toHaveBeenCalledWith('Component not found in registry: Foo');
    warn.mockRestore();
  });

  it('renders a registered component with a single string dependency', () => {
    config.registerComponent({
      name: 'Card',
      dependencies: 'News Item',
      component: MockCard,
    });
    render(
      <Component<{ title?: string }>
        componentName="Card"
        dependencies="News Item"
        title="My news item"
      />,
    );
    expect(screen.getByTestId('mock-card')).toHaveTextContent('My news item');
  });

  it('renders a registered component with multiple dependencies', () => {
    config.registerComponent({
      name: 'Card',
      dependencies: ['News Item', 'featured'],
      component: MockCard,
    });
    render(
      <Component<{ title?: string }>
        componentName="Card"
        dependencies={['News Item', 'featured']}
        title="Featured news"
      />,
    );
    expect(screen.getByTestId('mock-card')).toHaveTextContent('Featured news');
  });

  it('falls back to null when dependency variant is not registered', () => {
    config.registerComponent({ name: 'Card', component: MockCard });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <Component componentName="Card" dependencies="Unknown Type" />,
    );
    expect(container.firstChild).toBeNull();
    warn.mockRestore();
  });
});
