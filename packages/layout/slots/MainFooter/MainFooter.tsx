import type { SlotComponentProps } from '../SlotRenderer';
import { Link } from '@plone/components';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import clsx from 'clsx';

import styles from './MainFooter.module.css';
import Logo from '../Logo/Logo';

const Footer = (props: SlotComponentProps) => {
  const { content, location } = props;
  const siteActions = content?.['@components']?.actions?.site_actions || [];

  return (
    <SectionWrapper
      section="footer"
      className={clsx(styles.footer, 'main-footer')}
    >
      {/* TODO: i18n properly */}
      <div className="footer-message">
        The Plone® Open Source CMS/WCM is © 2000-2024 by the Plone Foundation
        and friends. <br />
        Distributed under the GNU GPL license.
      </div>
      <ul>
        {siteActions?.length
          ? siteActions.map((item) => (
              <li className="item" key={item.id}>
                <Link className="item" href={item.url}>
                  {item?.title}
                </Link>
              </li>
            ))
          : null}
      </ul>

      <Logo content={content} location={location} />

      <a className="item powered-by" href="https://plone.org">
        Powered by Plone & Python
      </a>
    </SectionWrapper>
  );
};

export default Footer;
