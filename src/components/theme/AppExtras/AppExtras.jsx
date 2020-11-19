import React from 'react';
import { matchPath } from 'react-router';

import * as config from '~/config';

const AppExtras = (props) => {
  const { appExtras = [] } = config;
  const { pathname } = props;
  const active = appExtras
    .map((reg) => {
      const match = matchPath(pathname, reg.match);
      return match ? { reg, match } : null;
    })
    .filter((reg) => reg);

  return active.map(({ reg: { component }, match }, i) => {
    const Insert = component;
    return <Insert key={`appextra-${i}`} match={match} {...props} />;
  });
};

export default AppExtras;
