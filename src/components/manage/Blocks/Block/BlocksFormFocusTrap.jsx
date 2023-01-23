import React from 'react';
import { usePrevious } from '@plone/volto/helpers';

const handleEnter = ({ ev, setActive, active, fields, blockProps }) => {
  if (!['Return', 'Enter'].includes(ev.key)) return;

  if (active !== fields.length - 1) {
    setActive(active + 1);
  } else {
    const { onFocusNextBlock, block, blockNode } = blockProps;
    onFocusNextBlock(block, blockNode.current);
  }

  return true;
};

const handleDownArrow = ({ ev, setActive, active, fields, blockProps }) => {
  if (ev.key !== 'ArrowDown') return;

  if (active === fields.length - 1) {
    const { onFocusNextBlock, block, blockNode } = blockProps;
    onFocusNextBlock(block, blockNode.current);
  } else {
    setActive(active + 1);
  }

  return true;
};

const handleUpArrow = ({ ev, setActive, active, fields, blockProps }) => {
  if (ev.key !== 'ArrowUp') return;

  if (active === 0) {
    const { onFocusPreviousBlock, block, blockNode } = blockProps;
    onFocusPreviousBlock(block, blockNode.current);
  } else {
    setActive(active - 1);
  }

  return true;
};

const keyHandlers = [handleEnter, handleDownArrow, handleUpArrow];

const BlocksFormFocusTrap = (props) => {
  // a component that handles focus and traversing for a list of fields
  // it enables a deep integration with the blocks form
  const { fields, selected, onSelectBlock, block } = props;
  const [active, setActive] = React.useState(0);

  const previousSelected = usePrevious(selected);
  React.useEffect(() => {
    if (!selected && previousSelected) {
      setActive(0);
    }
  }, [previousSelected, selected]);

  const getFocusTrapProps = (index) => {
    return {
      focus: selected && active === index,
      getInputProps() {
        return {
          onFocus() {
            if (!selected) onSelectBlock(block);
            setActive(index);
          },
          onKeyDown(ev) {
            const handled = keyHandlers.find((handler) =>
              handler({ ev, setActive, active, fields, blockProps: props }),
            );
            if (handled) {
              ev.preventDefault();
              ev.stopPropagation();
            }
          },
        };
      },
    };
  };

  return props.children({ getFocusTrapProps });
};

export default BlocksFormFocusTrap;
