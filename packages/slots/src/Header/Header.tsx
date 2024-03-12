import React from 'react';
import SlotRenderer from '../SlotRenderer';
import { ActionsResponse, Content } from '@plone/types';

interface HeaderProps {
  content: Content;
  pathname: string;
  token: string;
  siteActions: ActionsResponse['site_actions'];
}

const Header: React.FC<HeaderProps> = ({
  content,
  pathname,
  token,
  siteActions,
}) => {
  return (
    <header>
      <div className="header">
        <div className="tools-wrapper">
          <SlotRenderer name="headerTools" content={content} />

          <div className="tools">
            {!token && <Anontools />}
            {siteActions &&
              siteActions.map((item) => (
                <UniversalLink key={item.url} href={item.url}>
                  {item.title}
                </UniversalLink>
              ))}
          </div>
          {siteLabel && (
            <div className="intranet">
              <p>{siteLabel}</p>
            </div>
          )}
        </div>
        <div className="logo-nav-wrapper">
          <div className="logo">
            <Logo />
          </div>
          <Navigation pathname={pathname} />
          <MobileNavigation pathname={pathname} />
          <div className="search-wrapper navigation-desktop">
            <div className="search">
              <SearchWidget />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
