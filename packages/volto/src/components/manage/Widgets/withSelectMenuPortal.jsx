import React, { useCallback, useRef, useState } from 'react';

const components = new WeakMap();

export default function withSelectMenuPortal(Select) {
  if (!components.has(Select)) {
    const ModalSelect = (props) => {
      const [modal, setModal] = useState(null);
      const control = useRef(null);
      const selectRef = useCallback((instance) => {
        while (instance?.select) instance = instance.select;
        control.current = instance?.controlRef;
        setModal(control.current?.closest('.ui.modal') || null);
      }, []);

      return (
        <Select
          ref={selectRef}
          closeMenuOnScroll={(event) =>
            !!control.current?.closest('.ui.modal') &&
            event.target instanceof Node &&
            event.target.contains(control.current)
          }
          {...(modal && {
            menuPortalTarget: modal,
            menuPosition: 'fixed',
            menuPlacement: 'auto',
            menuShouldScrollIntoView: false,
          })}
          {...props}
          styles={
            modal
              ? {
                  ...props.styles,
                  menuPortal: (base, state) => {
                    const rect = modal.getBoundingClientRect();
                    return {
                      ...base,
                      ...props.styles?.menuPortal?.(base, state),
                      position: 'absolute',
                      left:
                        base.left -
                        rect.left -
                        modal.clientLeft +
                        modal.scrollLeft,
                      top:
                        base.top - rect.top - modal.clientTop + modal.scrollTop,
                    };
                  },
                }
              : props.styles
          }
        />
      );
    };
    components.set(Select, ModalSelect);
  }
  return components.get(Select);
}
