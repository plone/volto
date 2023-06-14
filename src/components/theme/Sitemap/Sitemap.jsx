import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { asyncConnect } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { Helmet, toBackendLang } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import config from '@plone/volto/registry';

import { getNavigation } from '@plone/volto/actions';
import { useIntls } from '@plone/volto/hooks/intl/useIntls';
import { useNavigation } from '@plone/volto/hooks/navigation/useNavigation';

const messages = defineMessages({
  Sitemap: {
    id: 'Sitemap',
    defaultMessage: 'Sitemap',
  },
});

const Sitemap =()=> {
 
  const dispatch=useDispatch();
  const intl=useIntl();
  const lang=useIntls();
  const items=useNavigation();
 useEffect(()=>{
  const { settings } = config;
  if (settings.isMultilingual) {
    dispatch(getNavigation(`${toBackendLang(lang)}`, 4));
  } else {
    dispatch(getNavigation('', 4));
  }
 })


  renderItems = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li
            key={item.url}
            className={item.items?.length > 0 ? 'with-children' : ''}
          >
            <Link to={item.url}>{item.title}</Link>
            {item.items && renderItems(item.items)}
          </li>
        ))}
      </ul>
    );
  };


    return (
      <div id="page-sitemap">
        <Helmet title={intl.formatMessage(messages.Sitemap)} />
        <Container className="view-wrapper">
          <h1>{intl.formatMessage(messages.Sitemap)} </h1>
          {items && renderItems(items)}
        </Container>
      </div>
    );
  }

Sitemap.propTypes = {
  getNavigation: PropTypes.func.isRequired,
};

export const __test__ = Sitemap;

export default compose(
  asyncConnect([
    {
      key: 'navigation',
      promise: ({ location, store: { dispatch, getState } }) => {
        const { settings } = config;
        const lang = getState().intl.locale;
        if (settings.isMultilingual) {
          return (
            __SERVER__ && dispatch(getNavigation(`${toBackendLang(lang)}`, 4))
          );
        } else {
          return __SERVER__ && dispatch(getNavigation('', 4));
        }
      },
    },
  ]),
)(Sitemap);
