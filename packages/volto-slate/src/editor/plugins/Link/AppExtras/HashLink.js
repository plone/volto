import React from 'react';
import { withRouter } from 'react-router';
import { withHashLink } from 'volto-slate/hooks';

import config from '@plone/volto/registry';

const scrollToTarget = (target, offsetHeight = 0) => {
  const bodyRect = document.body.getBoundingClientRect().top;
  const targetRect = target.getBoundingClientRect().top;
  const targetPosition = targetRect - bodyRect - offsetHeight;

  return window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

const HashLink = ({ history, pathname, hashlink, resetHashLink }) => {
  const { settings } = config;
  const blacklist = settings.hashlinkBlacklist || [];
  const id = hashlink.hash;
  const type = hashlink.data.type || '';

  React.useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.pathname !== pathname) {
        resetHashLink();
      }
    });
    return () => {
      unlisten();
    };
    /* eslint-disable-next-line */
  }, []);

  React.useEffect(() => {
    if (hashlink.counter > 0 && blacklist.indexOf(type) === -1) {
      const element = document.getElementById(id);
      const headerWrapper = document.querySelector('.header-wrapper');
      const offsetHeight =
        hashlink.data.offsetHeight || headerWrapper?.offsetHeight || 0;
      if (element) {
        scrollToTarget(element, offsetHeight);
      }
    }
    /* eslint-disable-next-line */
  }, [hashlink.counter]);

  return <React.Fragment />;
};

export default withRouter(withHashLink(HashLink));
