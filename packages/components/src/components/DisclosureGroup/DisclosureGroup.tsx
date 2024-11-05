import * as React from 'react';
import {
  UNSTABLE_DisclosureGroup as RACDisclosureGroup,
  type DisclosureGroupProps,
} from 'react-aria-components';

/**
 * A DisclosureGroup is used to group Disclosures together to create an accordion.
 *
 * NOTE: This component is in alpha in RAC thus it's unstable and is subjects of change
 *  in the API, behavior, and appearance.
 */
export function DisclosureGroup(props: DisclosureGroupProps) {
  return <RACDisclosureGroup {...props} />;
}
