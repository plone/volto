import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Input,
  Segment,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import {
  removeAliases,
  addAliases,
  getAliases,
  getContent,
} from '@plone/volto/actions';

import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import { getBaseUrl } from '@plone/volto/helpers';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  aliases: {
    id: 'URL Management',
    defaultMessage: 'URL Management',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  successAdd: {
    id: 'Alias has been added',
    defaultMessage: 'Alias has been added',
  },
});

const Aliases = ({
  intl,
  pathname,
  title,
  aliases,
  getAliases,
  getContent,
  addAliases,
  removeAliases,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [newAlias, setNewAlias] = useState('');
  const [isAliasCorrect, setIsAliasCorrect] = useState(false);
  const [isAliasAlready, setIsAliasAlready] = useState(false);
  const [aliasesToRemove, setAliasesToRemove] = useState([]);

  useEffect(() => {
    getAliases(getBaseUrl(pathname), {
      query: '',
      manual: '',
      datetime: '',
      batchSize: '',
    });
    getContent(getBaseUrl(pathname));
    setIsClient(true);
  }, [pathname, getAliases, getContent]);

  useEffect(() => {
    if (newAlias.charAt(0) === '/') {
      setIsAliasCorrect(true);
    } else {
      setIsAliasCorrect(false);
    }
    if (aliases?.items.find((item) => item.path === newAlias)) {
      setIsAliasAlready(true);
    } else {
      setIsAliasAlready(false);
    }
  }, [newAlias, aliases]);

  useEffect(() => {
    if (aliases.add.loading && !aliases.add.loaded) {
      if (aliases.add.error) {
        setIsAliasAlready(true);
      } else {
        setIsAliasAlready(false);
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content={intl.formatMessage(messages.successAdd)}
          />,
        );
      }
      getAliases(getBaseUrl(pathname), {
        query: '',
        manual: '',
        datetime: '',
        batchSize: '',
      });
    }
    if (aliases.remove.loading && !aliases.remove.loaded) {
      getAliases(getBaseUrl(pathname), {
        query: '',
        manual: '',
        datetime: '',
        batchSize: '',
      });
    }
  }, [
    aliases.add.loaded,
    aliases.remove.loaded,
    aliases.add.loading,
    aliases.add.error,
    aliases.remove.loading,
    intl,
    pathname,
    getAliases,
  ]);

  const handleAltChange = (val) => {
    setNewAlias(val);
  };

  const handleSubmitAlias = () => {
    if (isAliasCorrect) {
      addAliases(getBaseUrl(pathname), {
        items: newAlias,
      });
      setNewAlias('');
    }
  };

  const handleCheckAlias = (alias) => {
    setAliasesToRemove((prevAliases) =>
      prevAliases.includes(alias)
        ? prevAliases.filter((item) => item !== alias)
        : [...prevAliases, alias],
    );
  };

  const handleRemoveAliases = () => {
    removeAliases(getBaseUrl(pathname), {
      items: aliasesToRemove,
    });
    setAliasesToRemove([]);
  };

  return (
    <Container id="aliases">
      <Helmet title={intl.formatMessage(messages.aliases)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="URL Management for {title}"
            defaultMessage="URL Management for {title}"
            values={{ title: <q>{title}</q> }}
          />
        </Segment>
        <Segment secondary>
          <FormattedMessage
            id="Using this form, you can manage alternative urls for an item. This is an easy way to make an item available under two different URLs."
            defaultMessage="Using this form, you can manage alternative urls for an item. This is an easy way to make an item available under two different URLs."
          />
        </Segment>
        <Form>
          <Segment>
            <Header size="medium">
              <FormattedMessage
                id="Add a new alternative url"
                defaultMessage="Add a new alternative url"
              />
            </Header>
            <p className="help">
              <FormattedMessage
                id="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
                defaultMessage="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
              />
            </p>
            <Form.Field>
              <Input
                id="alternative-url-input"
                name="alternative-url"
                placeholder="/example"
                value={newAlias}
                onChange={(e) => handleAltChange(e.target.value)}
              />
              {!isAliasCorrect && newAlias !== '' && (
                <p style={{ color: 'red' }}>
                  <FormattedMessage
                    id="Alternative url path must start with a slash."
                    defaultMessage="Alternative url path must start with a slash."
                  />
                </p>
              )}
              {isAliasAlready && (
                <p style={{ color: 'red' }}>
                  <FormattedMessage
                    id="The provided alternative url already exists!"
                    defaultMessage="The provided alternative url already exists!"
                  />
                </p>
              )}
            </Form.Field>
            <Button
              id="submit-alias"
              primary
              onClick={handleSubmitAlias}
              disabled={!isAliasCorrect || newAlias === '' || isAliasAlready}
            >
              <FormattedMessage id="Add" defaultMessage="Add" />
            </Button>
          </Segment>
        </Form>
        <Form>
          <Segment>
            <Header size="medium">
              <FormattedMessage
                id="Existing alternative urls for this item"
                defaultMessage="Existing alternative urls for this item"
              />
            </Header>
            {aliases?.items.map((alias, i) => (
              <Form.Field key={i}>
                <Checkbox
                  id={`alias-check-${i}`}
                  onChange={(e, { value }) => handleCheckAlias(value)}
                  value={alias.path}
                  label={alias.path}
                  checked={aliasesToRemove.includes(alias.path)}
                />
              </Form.Field>
            ))}
            <Button
              id="remove-alias"
              onClick={handleRemoveAliases}
              primary
              disabled={aliasesToRemove.length === 0}
            >
              <FormattedMessage id="Remove" defaultMessage="Remove" />
            </Button>
          </Segment>
        </Form>
      </Segment.Group>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}`} className="item">
                <Icon
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </Container>
  );
};

Aliases.propTypes = {
  removeAliases: PropTypes.func.isRequired,
  addAliases: PropTypes.func.isRequired,
  getAliases: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      aliases: state.aliases,
      pathname: props.location.pathname,
      title: state.content.data?.title || '',
    }),
    { addAliases, getAliases, removeAliases, getContent },
  ),
)(Aliases);
