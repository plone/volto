import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { ChevronupIcon } from '../icons';
import './ScrollToTopButton.css';

export interface ScrollToTopButtonProps {
  /**
   * The minimum scroll distance (in pixels) before the button appears
   * @default 300
   */
  threshold?: number;
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Scroll behavior: 'smooth' or 'auto'
   * @default 'smooth'
   */
  scrollBehavior?: ScrollBehavior;
}

/**
 * A button that appears when the user scrolls down the page
 * and scrolls to the top when clicked
 */
export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300,
  className = '',
  scrollBehavior = 'smooth',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior,
    });
  };

  return (
    <div
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''} ${className}`}
    >
      <Button
        onPress={scrollToTop}
        aria-label="Scroll to top"
        className="scroll-to-top-btn"
      >
        <ChevronupIcon />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
