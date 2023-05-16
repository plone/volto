/**
 * MissingTranslations component.
 * @module components/manage/MissingTranslations/MissingTranslations
 */
import { useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Dropdown, Icon, Segment, Table } from 'semantic-ui-react';
import { concat, map, reverse, find } from 'lodash';
import { Portal } from 'react-portal';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { asyncConnect } from '@plone/volto/helpers';

import { FormattedDate, Icon as IconNext, Toolbar, Forbidden, Unauthorized } from '@plone/volto/components';
import { getMissingTranslations } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  missingTranslations: {
    id: 'MissingTranslations',
    defineMessage: 'Missing Translations',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

const MissingTranslations = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const truePath = props.location.pathname.replace('/missing-translations', '');

  useEffect(() => {
    dispatch(getMissingTranslations(truePath));
  }, [dispatch]);

  const items = useSelector((state) => state);

  console.log(items);

  return (
    <Container id="page-missing-translations">
      <Helmet title={intl.formatMessage(messages.missingTranslations)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Missing translations for {title} and below"
            defaultMessage="Missing translations for {title} and below"
            values={{
              title: <q>{truePath}</q>,
            }}
          />
        </Segment>
        <Segment secondary>
          <FormattedMessage id="You can view missing translations below." defaultMessage="You can view missing translations below." />
        </Segment>
      </Segment.Group>

      <Portal node={document.getElementById('toolbar')}>
        <Toolbar
          pathname={truePath}
          hideDefaultViewButtons
          inner={
            <Link to={`${getBaseUrl(truePath)}`} className="item">
              <IconNext name={backSVG} className="contents circled" size="30px" title={intl.formatMessage(messages.back)} />
            </Link>
          }
        />
      </Portal>
    </Container>
  );
};

export default MissingTranslations;
