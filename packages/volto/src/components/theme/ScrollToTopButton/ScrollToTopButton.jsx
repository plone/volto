/**
 * ScrollToTopButton component.
 * @module components/theme/ScrollToTopButton/ScrollToTopButton
 */

import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import upSVG from '@plone/volto/icons/up-key.svg';
import './scroll-to-top-button.css';

/**
 * ScrollToTopButton component class.
 * A button that appears when the user scrolls down the page
 * and scrolls to the top when clicked.
 * @function ScrollToTopButton
 * @returns {string} Markup of the component.
 */
const ScrollToTopButton = ({ threshold = 300 }) => {
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
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="scroll-to-top-button">
      <Button
        icon
        circular
        primary
        size="big"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className="scroll-to-top-btn"
      >
        <Icon name={upSVG} size="24px" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
