import * as React from 'react';
import {
  UNSTABLE_Disclosure as RACDisclosure,
  DisclosureProps,
} from 'react-aria-components';

/**
 * A Disclosure is used to show or hide content that is not visible by default.
 *
 * NOTE: This component is in alpha in RAC thus it's unstable and is subjects of change
 *  in the API, behavior, and appearance.
 */
export function Disclosure(props: DisclosureProps) {
  return <RACDisclosure {...props} />;
}
