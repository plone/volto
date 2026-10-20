import React from 'react';

type MenuTriggerChildren = [React.ReactElement, React.ReactElement];

function isFragmentElement(element: React.ReactElement) {
  return element.type === React.Fragment;
}

export function getMenuTriggerChildren(
  children: React.ReactNode,
  componentName: string,
): MenuTriggerChildren {
  const nodes = React.Children.toArray(children);

  if (nodes.length !== 2) {
    throw new Error(
      `${componentName} expects exactly two children: a trigger element and a menu element.`,
    );
  }

  const [trigger, menu] = nodes;

  if (!React.isValidElement(trigger) || !React.isValidElement(menu)) {
    throw new Error(
      `${componentName} expects both children to be valid React elements.`,
    );
  }

  if (isFragmentElement(trigger) || isFragmentElement(menu)) {
    throw new Error(
      `${componentName} does not accept Fragment children. Pass the trigger element and menu element directly.`,
    );
  }

  return [trigger, menu];
}

export type { MenuTriggerChildren };
