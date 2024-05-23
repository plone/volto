import React from 'react';
import { Logo } from '../index';

const Footer = ({ intl }) => {
  return (
    <footer id="footer">
      <div>
        <div>
          The Plone<sup>®</sup> Open Source CMS/WCM is{' '}
          <abbr title={'Copyright'}>©</abbr> 2000-{new Date().getFullYear()} by
          the Plone Foundation{' '}
          <span>
            {' '}
            <a className="item" href="http://plone.org/foundation">
              Plone Foundation
            </a>
          </span>{' '}
          and friends. <br />
          Distributed under the
          <span>
            {' '}
            <a
              className="item"
              href="http://creativecommons.org/licenses/GPL/2.0/"
            >
              GNU GPL license
            </a>
          </span>
        </div>
        <div>
          {' '}
          <Logo />
        </div>
        <a href="https://plone.org">Powered by Plone & Python</a>
        <br />
        <div>
          Made with{' '}
          <span role="img" aria-label="love" style={{ color: 'red' }}>
            ❤️
          </span>{' '}
          by kitconcept
        </div>
      </div>
    </footer>
  );
};

export default Footer;
