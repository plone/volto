import { useState, useCallback, useEffect } from 'react';

function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();

  if (rect.toJSON) {
    return rect.toJSON();
  } else {
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top || rect.y,
      left: rect.left || rect.x,
      x: rect.x || rect.left,
      y: rect.y || rect.top,
      right: rect.right,
      bottom: rect.bottom,
    };
  }
}

function useDimensions() {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node)),
        );
      measure();

      window.addEventListener('resize', measure);
      window.addEventListener('scroll', measure);

      return () => {
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure);
      };
    }
  }, [node]);

  return [ref, dimensions, node];
}

export default useDimensions;
