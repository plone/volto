import * as React from 'react';
import {
  DisclosureGroup as RACDisclosureGroup,
  type DisclosureGroupProps,
} from 'react-aria-components';

/**
 * A DisclosureGroup is used to group Disclosures together to create an accordion.
 */
export function DisclosureGroup(props: DisclosureGroupProps) {
  return <RACDisclosureGroup {...props} />;
}
