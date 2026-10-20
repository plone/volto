import * as React from 'react';
import { ChevronleftIcon } from '../../components/icons/ChevronleftIcon';
import type {
  DisclosureGroupProps,
  ButtonProps,
  DisclosureProps,
  DisclosurePanelProps,
} from 'react-aria-components';
import {
  DisclosureGroup,
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
} from 'react-aria-components';
import { composeTailwindRenderProps } from '../utils';

interface AccordionProps extends DisclosureGroupProps {
  ref?: React.RefObject<HTMLDivElement>;
}
const Accordion = ({ children, ref, className, ...props }: AccordionProps) => {
  return (
    <DisclosureGroup
      ref={ref}
      data-slot="disclosure-group"
      {...props}
      className={composeTailwindRenderProps(
        className,
        `
          peer cursor-pointer
          disabled:cursor-not-allowed disabled:opacity-75
        `,
      )}
    >
      {(values) => (
        <div data-slot="disclosure-content">
          {typeof children === 'function' ? children(values) : children}
        </div>
      )}
    </DisclosureGroup>
  );
};

interface AccordionItemProps extends DisclosureProps {
  ref?: React.Ref<HTMLDivElement>;
}
const AccordionItem = ({ className, ref, ...props }: AccordionItemProps) => {
  return (
    <Disclosure
      ref={ref}
      data-slot="disclosure"
      {...props}
      className={composeTailwindRenderProps(
        className,
        `
          peer group/disclosure w-full min-w-60 border-b border-border
          disabled:opacity-60
        `,
      )}
    >
      {props.children}
    </Disclosure>
  );
};

interface AccordionItemTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
}
const AccordionItemTrigger = ({
  className,
  ref,
  ...props
}: AccordionItemTriggerProps) => {
  return (
    <Heading>
      <Button
        ref={ref}
        slot="trigger"
        className={composeTailwindRenderProps(
          className,
          `
            group/trigger flex w-full items-center justify-between gap-x-2 py-3 text-left
            font-medium
            open:text-fg
            focus:text-fg focus:outline-hidden
            **:data-[slot=icon]:text-muted-fg **:data-[slot=icon]:-mx-0.5
            **:data-[slot=icon]:shrink-0
            disabled:cursor-default disabled:opacity-50
            **:data-[slot=disclosure-chevron]:size-5
            sm:text-sm
            forced-colors:disabled:text-[GrayText]
            **:[span]:flex **:[span]:items-center **:[span]:gap-x-1
            **:[span]:*:data-[slot=icon]:mr-1
            [&[aria-expanded=true]_[data-slot=disclosure-chevron]]:-rotate-90
          `,
        )}
        {...props}
      >
        {(values) => (
          <>
            {typeof props.children === 'function'
              ? props.children(values)
              : props.children}
            <ChevronleftIcon
              data-slot="disclosure-chevron"
              className="internal-chevron ml-auto size-4 shrink-0 transition duration-300"
            />
          </>
        )}
      </Button>
    </Heading>
  );
};

interface AccordionPanelProps extends DisclosurePanelProps {
  ref?: React.Ref<HTMLDivElement>;
}
const AccordionPanel = ({ className, ref, ...props }: AccordionPanelProps) => {
  return (
    <DisclosurePanel
      ref={ref}
      data-slot="disclosure-panel"
      className={composeTailwindRenderProps(
        className,
        `
          text-muted-fg overflow-hidden text-sm transition-all
          **:data-[slot=disclosure-group]:border-t
          **:data-[slot=disclosure-group]:**:[.internal-chevron]:hidden
          has-data-[slot=disclosure-group]:**:[button]:px-4
        `,
      )}
      {...props}
    >
      <div
        data-slot="disclosure-panel-content"
        className={`
          pt-0
          not-has-data-[slot=disclosure-group]:group-data-expanded/disclosure:pb-3
          [&:has([data-slot=disclosure-group])_&]:px-11
        `}
      >
        {props.children}
      </div>
    </DisclosurePanel>
  );
};

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionItemTriggerProps,
};
export { Accordion, AccordionItem, AccordionPanel, AccordionItemTrigger };
