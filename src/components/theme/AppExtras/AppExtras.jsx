import React from 'react';
import { matchPath } from 'react-router';

import { settings } from '~/config';

const AppExtras = (props) => {
  const { appExtras = [] } = settings;
  const { pathname } = props;
  const active = appExtras
    .map((reg) => {
      const match = matchPath(pathname, reg.match);
      return match ? { reg, match } : null;
    })
    .filter((reg) => reg);

  return active.map(({ reg: { component, props: extraProps }, match }, i) => {
    const Insert = component;
    return (
      <Insert key={`appextra-${i}`} match={match} {...props} {...extraProps} />
    );
  });
};

export default AppExtras;
