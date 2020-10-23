import React from 'react';
import { Button, Container, Segment, Table } from 'semantic-ui-react';
import { Helmet } from '@plone/volto/helpers';
import langmap from 'langmap';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { reduce } from 'lodash';
import { Link, useLocation } from 'react-router-dom';
import { Icon, Toast, Toolbar } from '@plone/volto/components';
import { settings } from '~/config';
import linkSVG from '@plone/volto/icons/link.svg';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { getContent, linkTranslation } from '@plone/volto/actions';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Portal } from 'react-portal';
import { toast } from 'react-toastify';

import backSVG from '@plone/volto/icons/back.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  ManageTranslations: {
    id: 'Manage Translations',
    defaultMessage: 'Manage Translations',
  },
  ManageTranslationsTitle: {
    id: 'Manage translations for {title}',
    defaultMessage: 'Manage translations for {title}',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

const ManageTranslations = (props) => {
  const intl = useIntl();
  const location = useLocation();
  const content = useSelector((state) => state.content.data);
  const dispatch = useDispatch();

  const { openObjectBrowser } = props;

  React.useEffect(() => {
    if (!content) {
      dispatch(getContent(getBaseUrl(location.pathname)));
    }
  }, [dispatch, content, location.pathname]);

  const translations = content &&
    content['@components'].translations.items && {
      [content.language.token]: {
        url: content['@id'],
      },
      ...reduce(
        content['@components'].translations.items,
        (acc, value) => {
          return { ...acc, [value.language]: { url: value['@id'] } };
        },
        {},
      ),
    };

  function onSelectTarget(target) {
    dispatch(linkTranslation(content['@id'], target))
      .then((resp) => {
        toast.success(
          <Toast
            success
            title={this.props.intl.formatMessage(messages.success)}
            content={this.props.intl.formatMessage(messages.saved)}
          />,
        );
      })
      .catch((error) => {
        // TODO: The true error sent by the API is shadowed by the superagent one
        // Update this when this issue is fixed.
        const shadowedError = JSON.parse(error.response.text);
        toast.error(
          <Toast
            error
            title={shadowedError.error.type}
            content={shadowedError.error.message}
          />,
          { toastId: 'linkFailed' },
        );
      });
  }

  return (
    <Container id="page-manage-translations">
      <Helmet title={intl.formatMessage(messages.ManageTranslations)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Manage translations for {title}"
            defaultMessage="Manage translations for {title}"
            values={{ title: <q>{content.title}</q> }}
          />
        </Segment>
        {content && (
          <Table selectable compact singleLine attached>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Language</Table.HeaderCell>
                <Table.HeaderCell>Path</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Tools</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {settings.supportedLanguages.map((lang) => (
                <Table.Row>
                  <Table.Cell collapsing>
                    {lang === content.language.token ? (
                      <strong>{langmap[lang].nativeName}</strong>
                    ) : (
                      langmap[lang].nativeName
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={flattenToAppURL(translations[lang]?.url || '')}>
                      {flattenToAppURL(translations[lang]?.url || '')}
                    </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button.Group>
                      <Button
                        basic
                        icon
                        onClick={() =>
                          openObjectBrowser({
                            mode: 'link',
                            overlay: true,
                            onSelectItem: (url) => {
                              onSelectTarget(url);
                            },
                          })
                        }
                      >
                        <Icon name={linkSVG} size="24px" />
                      </Button>
                    </Button.Group>
                    {}
                    <Button.Group>
                      <Button
                        basic
                        icon
                        onClick={() =>
                          openObjectBrowser({ mode: 'link', overlay: true })
                        }
                      >
                        <Icon name={deleteSVG} size="24px" />
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        {__CLIENT__ && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={location.pathname}
              hideDefaultViewButtons
              inner={
                <Link to={`${getBaseUrl(location.pathname)}`} className="item">
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />
          </Portal>
        )}
      </Segment.Group>
    </Container>
  );
};

export default withObjectBrowser(ManageTranslations);
