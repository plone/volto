import React from 'react';
import { Button, Header, Modal, Table } from 'semantic-ui-react';
import langmap from 'langmap';
import { flattenToAppURL } from '@plone/volto/helpers';
import { find } from 'lodash';
import { Link } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import { settings } from '~/config';
import linkSVG from '@plone/volto/icons/link.svg';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

const ManageTranslations = (props) => {
  const { content, openObjectBrowser } = props;

  function getTranslationURL(lang) {
    return lang === content.language.token
      ? flattenToAppURL(content['@id'])
      : flattenToAppURL(
          find(content['@components'].translations.items, {
            language: lang,
          })?.['@id'] || '',
        );
  }

  return (
    <Modal
      open={props.open}
      className={props.className}
      onClick={(e) => e.stopPropagation()}
    >
      <Header>{props.title}</Header>
      <Modal.Content>
        <Table selectable compact singleLine attached>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Path</Table.HeaderCell>
              <Table.HeaderCell>Tools</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {settings.supportedLanguages.map((lang) => (
              <Table.Row>
                <Table.Cell>{langmap[lang].nativeName}</Table.Cell>
                <Table.Cell>
                  <Link to={getTranslationURL(lang)}>
                    {getTranslationURL(lang)}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => openObjectBrowser({ mode: 'link' })}>
                    <Icon name={linkSVG} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
    </Modal>
  );
};

export default withObjectBrowser(ManageTranslations);
