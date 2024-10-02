import * as React from 'react';
import {
  UNSTABLE_DisclosureGroup as RACDisclosureGroup,
  DisclosureGroupProps,
} from 'react-aria-components';

export function DisclosureGroup(props: DisclosureGroupProps) {
  return <RACDisclosureGroup {...props} />;
}
