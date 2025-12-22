import React from 'react';
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ScrollToTopButton } from './ScrollToTopButton';

expect.extend(toHaveNoViolations);

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    const { container } = render(<ScrollToTopButton />);
    expect(container).toBeTruthy();
  });

  it('is hidden when scroll position is below threshold', () => {
    const { container } = render(<ScrollToTopButton threshold={300} />);
    const buttonContainer = container.querySelector('.scroll-to-top-button');
    expect(buttonContainer).not.toHaveClass('visible');
  });

  it('becomes visible when scroll position exceeds threshold', async () => {
    const { container } = render(<ScrollToTopButton threshold={300} />);

    // Simulate scroll past threshold
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 400,
    });

    fireEvent.scroll(window);

    await waitFor(() => {
      const buttonContainer = container.querySelector('.scroll-to-top-button');
      expect(buttonContainer).toHaveClass('visible');
    });
  });

  it('scrolls to top when button is clicked', async () => {
    // Set scroll position above threshold
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<ScrollToTopButton threshold={300} />);

    // Trigger scroll event to make button visible
    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /scroll to top/i });
      expect(button).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('uses custom threshold', async () => {
    const { container } = render(<ScrollToTopButton threshold={500} />);

    // Scroll to 400px (below custom threshold of 500px)
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 400,
    });

    fireEvent.scroll(window);

    const buttonContainer = container.querySelector('.scroll-to-top-button');
    expect(buttonContainer).not.toHaveClass('visible');

    // Scroll to 600px (above threshold)
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 600,
    });

    fireEvent.scroll(window);

    await waitFor(() => {
      expect(buttonContainer).toHaveClass('visible');
    });
  });

  it('passes a11y test', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { container } = render(<ScrollToTopButton />);

    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /scroll to top/i });
      expect(button).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrollToTopButton className="custom-class" />,
    );
    const buttonContainer = container.querySelector('.scroll-to-top-button');
    expect(buttonContainer).toHaveClass('custom-class');
  });

  it('uses custom scroll behavior', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<ScrollToTopButton scrollBehavior="auto" />);

    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /scroll to top/i });
      expect(button).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    });
  });
});
