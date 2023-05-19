/**
 * MissingTranslations component.
 * @module components/manage/MissingTranslations/MissingTranslations
 */
import { useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Segment, Table } from 'semantic-ui-react';
import { map } from 'lodash';
import { Portal } from 'react-portal';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';

import { Icon, Toolbar } from '@plone/volto/components';
import { getMissingTranslations } from '@plone/volto/actions';
import { getBaseUrl, flattenToAppURL, langmap } from '@plone/volto/helpers';

import backSVG from '@plone/volto/icons/back.svg';
import addSVG from '@plone/volto/icons/add.svg';

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

  const items = useSelector((state) => state.missingtranslations.missingtranslations);

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
      <Table selectable compact singleLine attached>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>
              <FormattedMessage id="Type" defaultMessage="Type" />
            </Table.HeaderCell>
            <Table.HeaderCell width={6}>
              <FormattedMessage id="Title (URL)" defaultMessage="Title (URL)" />
            </Table.HeaderCell>
            <Table.HeaderCell width={5}>
              <FormattedMessage id="Add missing translations for" defaultMessage="Add missing translations for" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(items, (item) => (
            <Table.Row key={item.url}>
              <Table.Cell>
                <span>{item['@type']}</span>
              </Table.Cell>
              <Table.Cell>
                <Link className="item" to={flattenToAppURL(item.url)}>
                  {item.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {item.missing_languages.map((lang) => (
                  <Button
                    basic
                    icon
                    as={Link}
                    to={{
                      pathname: `${flattenToAppURL(item.url)}/manage-translation/create-translation`,
                      state: {
                        type: item['@type'],
                        translationOf: item['@id'],
                        language: lang,
                      },
                    }}
                  >
                    {langmap[lang].nativeName}
                  </Button>
                ))}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {__CLIENT__ && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={truePath}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(truePath)}`} className="item">
                <Icon name={backSVG} className="contents circled" size="30px" title={intl.formatMessage(messages.back)} />
              </Link>
            }
          />
        </Portal>
      )}
    </Container>
  );
};

export default MissingTranslations;
