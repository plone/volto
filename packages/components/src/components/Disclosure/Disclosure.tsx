import * as React from 'react';
import {
  Disclosure as RACDisclosure,
  type DisclosureProps,
} from 'react-aria-components';

/**
 * A Disclosure is used to show or hide content that is not visible by default.
 */
export function Disclosure(props: DisclosureProps) {
  return <RACDisclosure {...props} />;
}
