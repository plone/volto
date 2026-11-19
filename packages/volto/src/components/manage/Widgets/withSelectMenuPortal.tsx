import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type PortalStyle = React.CSSProperties & { left: number; top: number };

type SelectMenuProps = {
  closeMenuOnScroll?: boolean | ((event: Event) => boolean);
  styles?: {
    menuPortal?: (base: PortalStyle, state: unknown) => React.CSSProperties;
    [key: string]: unknown;
  };
};

type SelectInstance = {
  select?: SelectInstance;
  controlRef?: HTMLElement;
  props?: { menuIsOpen?: boolean; onMenuClose: () => void };
};

const components = new WeakMap<object, unknown>();

export default function withSelectMenuPortal<
  Props extends SelectMenuProps,
  Instance,
>(Select: React.ComponentType<Props & React.RefAttributes<Instance>>) {
  type ModalSelectComponent = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Props> & React.RefAttributes<Instance>
  >;
  const cached = components.get(Select) as ModalSelectComponent | undefined;
  if (cached) return cached;

  const ModalSelect = forwardRef<Instance, Props>((props, forwardedRef) => {
    const [modal, setModal] = useState<HTMLElement | null>(null);
    const select = useRef<SelectInstance | null>(null);
    const selectRef = useCallback(
      (instance: Instance | null) => {
        let inner = instance as SelectInstance | null;
        while (inner?.select) inner = inner.select;
        select.current = inner;
        setModal(inner?.controlRef?.closest<HTMLElement>('.ui.modal') ?? null);

        if (typeof forwardedRef === 'function') forwardedRef(instance);
        else if (forwardedRef) forwardedRef.current = instance;
      },
      [forwardedRef],
    );

    useEffect(() => {
      if (!modal || props.closeMenuOnScroll !== undefined) return;
      const document = modal.ownerDocument;
      const closeOnScroll = (event: Event) => {
        const instance = select.current;
        if (
          instance?.props?.menuIsOpen &&
          event.target instanceof Node &&
          event.target.contains(instance.controlRef ?? null)
        ) {
          instance.props.onMenuClose();
        }
      };
      document.addEventListener('scroll', closeOnScroll, true);
      return () => document.removeEventListener('scroll', closeOnScroll, true);
    }, [modal, props.closeMenuOnScroll]);

    if (!modal) return <Select {...(props as Props)} ref={selectRef} />;

    return (
      <Select
        menuPortalTarget={modal}
        menuPosition="fixed"
        menuPlacement="auto"
        menuShouldScrollIntoView={false}
        {...(props as Props)}
        ref={selectRef}
        styles={{
          ...props.styles,
          menuPortal: (base: PortalStyle, state: unknown) => {
            const rect = modal.getBoundingClientRect();
            return {
              ...base,
              ...props.styles?.menuPortal?.(base, state),
              position: 'absolute',
              left: base.left - rect.left - modal.clientLeft + modal.scrollLeft,
              top: base.top - rect.top - modal.clientTop + modal.scrollTop,
            };
          },
        }}
      />
    );
  });
  ModalSelect.displayName = 'ModalSelect';
  components.set(Select, ModalSelect);
  return ModalSelect;
}
