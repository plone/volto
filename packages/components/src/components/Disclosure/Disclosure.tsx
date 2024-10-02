import * as React from 'react';
import {
  UNSTABLE_Disclosure as RACDisclosure,
  DisclosureProps,
} from 'react-aria-components';

export function Disclosure(props: DisclosureProps) {
  return <RACDisclosure {...props} />;
}
