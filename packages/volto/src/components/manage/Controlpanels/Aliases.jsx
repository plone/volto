import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  getBaseUrl,
  getParentUrl,
  Helmet,
  usePrevious,
} from '@plone/volto/helpers';
import { removeAliases, addAliases, getAliases } from '@plone/volto/actions';
import { createPortal } from 'react-dom';
import {
  Container,
  Button,
  Segment,
  Form,
  Checkbox,
  Header,
  Input,
  Radio,
  Message,
  Table,
  Pagination,
  Menu,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import DatetimeWidget from '@plone/volto/components/manage/Widgets/DatetimeWidget';
import { Icon, Toolbar } from '@plone/volto/components';
import { useClient } from '@plone/volto/hooks';

import backSVG from '@plone/volto/icons/back.svg';
import { map } from 'lodash';
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

const filterChoices = [
  { label: 'Both', value: '' },
  { label: 'Automatically', value: 'no' },
  { label: 'Manually', value: 'yes' },
];

const itemsPerPageChoices = [10, 25, 50, 'All'];

const Aliases = (props) => {
  const title = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const aliases = useSelector((state) => state.aliases);
  const [filterType, setFilterType] = useState(filterChoices[0]);
  const [createdBefore, setCreatedBefore] = useState(null);
  const [altUrlPath, setAltUrlPath] = useState('');
  const [isAltUrlCorrect, setIsAltUrlCorrect] = useState(false);
  const [targetUrlPath, setTargetUrlPath] = useState('');
  const [aliasesToRemove, setAliasesToRemove] = useState([]);
  const [errorMessageAdd, setErrorMessageAdd] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const isClient = useClient();

  const prevaliasesitemstotal = usePrevious(aliases.items_total);
  const previtemsPerPage = usePrevious(itemsPerPage);
  const prevactivePage = usePrevious(activePage);
  const prevalturlpath = usePrevious(altUrlPath);
  const prevtargetUrlPath = usePrevious(targetUrlPath);
  const prevaliasesaddloading = usePrevious(aliases.add.loading);
  const prevaliasesremoveloading = usePrevious(aliases.remove.loading);

  useEffect(() => {
    if (
      prevaliasesitemstotal !== aliases.items_total ||
      previtemsPerPage !== itemsPerPage
    ) {
      const pages = Math.ceil(aliases.items_total / itemsPerPage);

      if (pages === 0 || isNaN(pages)) {
        setPages('');
      } else {
        setPages(pages);
      }
    }
    if (prevactivePage !== activePage || previtemsPerPage !== itemsPerPage) {
      dispatch(
        getAliases(getBaseUrl(pathname), {
          query: filterQuery,
          manual: filterType.value,
          datetime: createdBefore,
          batchSize: itemsPerPage === 'All' ? 999999999999 : itemsPerPage,
          batchStart: (activePage - 1) * itemsPerPage,
        }),
      );
    }
    if (prevalturlpath !== altUrlPath) {
      if (altUrlPath.charAt(0) === '/') {
        setIsAltUrlCorrect(true);
      } else {
        setIsAltUrlCorrect(false);
      }
    }
  }, [
    itemsPerPage,
    pathname,
    prevaliasesitemstotal,
    aliases.items_total,
    previtemsPerPage,
    prevactivePage,
    activePage,
    prevalturlpath,
    altUrlPath,
    prevtargetUrlPath,
    targetUrlPath,
    dispatch,
    filterQuery,
    filterType.value,
    createdBefore,
  ]);

  useEffect(() => {
    if (prevaliasesaddloading && !aliases.add.loaded) {
      if (aliases.add.error) {
        setErrorMessageAdd(aliases.add.error.response.body.message);
      }
    }
    if (prevaliasesaddloading && aliases.add.loaded) {
      dispatch(
        getAliases(getBaseUrl(pathname), {
          query: filterQuery,
          manual: filterType.value,
          datetime: createdBefore,
          batchSize: itemsPerPage,
        }),
      );
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.successAdd)}
        />,
      );
      if (!aliases.add.error) {
        setErrorMessageAdd('');
      }
    }
    if (prevaliasesremoveloading && aliases.remove.loaded) {
      dispatch(
        getAliases(getBaseUrl(pathname), {
          query: filterQuery,
          manual: filterType.value,
          datetime: createdBefore,
          batchSize: itemsPerPage,
        }),
      );
    }
  }, [
    prevaliasesaddloading,
    aliases.add.loaded,
    aliases.add.error,
    aliases.remove.loaded,
    prevaliasesremoveloading,
    dispatch,
    pathname,
    filterQuery,
    filterType.value,
    createdBefore,
    itemsPerPage,
    intl,
  ]);

  const onCancel = () => {
    history.push(getParentUrl(pathname));
  };

  const handleSelectFilterType = (type) => {
    setFilterType(type);
  };

  const handleFilterQueryChange = (query) => {
    setFilterQuery(query);
  };

  const handleCreateDate = (date) => {
    setCreatedBefore(date);
  };

  const handleSubmitFilter = () => {
    dispatch(
      getAliases(getBaseUrl(pathname), {
        query: filterQuery,
        manual: filterType.value,
        datetime: createdBefore,
        batchSize: itemsPerPage,
      }),
    );
  };

  const handleAltUrlChange = (url) => {
    setAltUrlPath(url);
  };

  const handleTargetUrlChange = (url) => {
    setTargetUrlPath(url);
  };

  const handleSubmitAlias = useCallback(() => {
    if (isAltUrlCorrect) {
      dispatch(
        addAliases('', {
          items: [
            {
              path: altUrlPath,
              'redirect-to': targetUrlPath,
            },
          ],
        }),
      );
      setAltUrlPath('');
      setTargetUrlPath('');
    }
  }, [isAltUrlCorrect, altUrlPath, targetUrlPath, dispatch]);

  const handleCheckAlias = (alias) => {
    const aliasess = [...aliasesToRemove];
    if (aliasess.includes(alias)) {
      const index = aliasess.indexOf(alias);
      if (index > -1) {
        let newAliasesArr = aliasess;
        newAliasesArr.splice(index, 1);
        setAliasesToRemove(newAliasesArr);
      }
    } else {
      setAliasesToRemove([...aliasesToRemove, alias]);
    }
  };
  const handleRemoveAliases = () => {
    const items = aliasesToRemove.map((a) => {
      return {
        path: a,
      };
    });

    dispatch(
      removeAliases('', {
        items,
      }),
    );
    setAliasesToRemove([]);
  };

  const handlePageChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const handleItemsPerPage = (e, { value }) => {
    setItemsPerPage(value);
    setActivePage(1);
  };

  return (
    <div id="page-aliases">
      <Helmet title={intl.formatMessage(messages.aliases)} />
      <Container>
        <article id="content">
          <Segment.Group raised>
            <Segment className="primary">
              <FormattedMessage
                id="URL Management"
                defaultMessage="URL Management"
                values={{ title: <q>{title}</q> }}
              />
            </Segment>
            <Form>
              <Segment>
                <Header size="medium">
                  <FormattedMessage
                    id="Alternative url path (Required)"
                    defaultMessage="Alternative url path (Required)"
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
                    name="alternative-url-path"
                    placeholder="/example"
                    value={altUrlPath}
                    onChange={(e) => handleAltUrlChange(e.target.value)}
                  />
                  {!isAltUrlCorrect && altUrlPath !== '' && (
                    <p style={{ color: 'red' }}>
                      <FormattedMessage
                        id="Alternative url path must start with a slash."
                        defaultMessage="Alternative url path must start with a slash."
                      />
                    </p>
                  )}
                </Form.Field>
                <Header size="medium">
                  <FormattedMessage
                    id="Target Path (Required)"
                    defaultMessage="Target Path (Required)"
                  />
                </Header>
                <p className="help">
                  <FormattedMessage
                    id="Enter the absolute path of the target. Target must exist or be an existing alternative url path to the target."
                    defaultMessage="Enter the absolute path of the target. Target must exist or be an existing alternative url path to the target."
                  />
                </p>
                <Form.Field>
                  <Input
                    id="target-url-input"
                    name="target-url-path"
                    placeholder="/example"
                    value={targetUrlPath}
                    onChange={(e) => handleTargetUrlChange(e.target.value)}
                  />
                </Form.Field>
                <Button
                  id="submit-alias"
                  primary
                  onClick={() => handleSubmitAlias()}
                  disabled={
                    !isAltUrlCorrect ||
                    altUrlPath === '' ||
                    targetUrlPath === ''
                  }
                >
                  <FormattedMessage id="Add" defaultMessage="Add" />
                </Button>
                {errorMessageAdd && (
                  <Message color="red">
                    <Message.Header>
                      <FormattedMessage
                        id="ErrorHeader"
                        defaultMessage="Error"
                      />
                    </Message.Header>
                    <p>{errorMessageAdd}</p>
                  </Message>
                )}
              </Segment>
            </Form>
            <Form>
              <Segment className="primary">
                <Header size="medium">
                  <FormattedMessage
                    id="All existing alternative urls for this site"
                    defaultMessage="All existing alternative urls for this site"
                  />
                </Header>
                <Header size="small">
                  <FormattedMessage
                    id="Filter by prefix"
                    defaultMessage="Filter by prefix"
                  />
                </Header>
                <Form.Field>
                  <Input
                    name="filter"
                    placeholder="/example"
                    value={filterQuery}
                    onChange={(e) => handleFilterQueryChange(e.target.value)}
                  />
                </Form.Field>
                <Header size="small">
                  <FormattedMessage
                    id="Manually or automatically added?"
                    defaultMessage="Manually or automatically added?"
                  />
                </Header>
                {filterChoices.map((o, i) => (
                  <Form.Field key={i}>
                    <Radio
                      label={o.label}
                      name="radioGroup"
                      value={o.value}
                      checked={filterType === o}
                      onChange={() => handleSelectFilterType(o)}
                    />
                  </Form.Field>
                ))}
                <Form.Field>
                  <DatetimeWidget
                    id="created-before-date"
                    title={'Created before'}
                    dateOnly={true}
                    value={createdBefore}
                    onChange={(id, value) => {
                      handleCreateDate(value);
                    }}
                  />
                </Form.Field>
                <Button onClick={() => handleSubmitFilter()} primary>
                  Filter
                </Button>
                <Header size="small">
                  <FormattedMessage
                    id="Alternative url path → target url path (date and time of creation, manually created yes/no)"
                    defaultMessage="Alternative url path → target url path (date and time of creation, manually created yes/no)"
                  />
                </Header>

                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.HeaderCell>
                        <FormattedMessage id="Select" defaultMessage="Select" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Alias" defaultMessage="Alias" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Target" defaultMessage="Target" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Date" defaultMessage="Date" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Manual" defaultMessage="Manual" />
                      </Table.HeaderCell>
                    </Table.Row>
                    {aliases.items.length > 0 &&
                      aliases.items.map((alias, i) => (
                        <Table.Row key={i}>
                          <Table.Cell>
                            <Checkbox
                              onChange={(e, { value }) =>
                                handleCheckAlias(value)
                              }
                              checked={aliasesToRemove.includes(alias.path)}
                              value={alias.path}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <p>{alias.path}</p>
                          </Table.Cell>
                          <Table.Cell>
                            <p>{alias['redirect-to']}</p>
                          </Table.Cell>
                          <Table.Cell>
                            <p>{alias.datetime}</p>
                          </Table.Cell>
                          <Table.Cell>
                            <p>{`${alias.manual}`}</p>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {pages && (
                    <Pagination
                      boundaryRange={0}
                      activePage={activePage}
                      ellipsisItem={null}
                      firstItem={null}
                      lastItem={null}
                      siblingRange={1}
                      totalPages={pages}
                      onPageChange={(e, o) => handlePageChange(e, o)}
                    />
                  )}
                  <Menu.Menu
                    position="right"
                    style={{ display: 'flex', marginLeft: 'auto' }}
                  >
                    <Menu.Item style={{ color: 'grey' }}>
                      <FormattedMessage id="Show" defaultMessage="Show" />:
                    </Menu.Item>
                    {map(itemsPerPageChoices, (size) => (
                      <Menu.Item
                        style={{
                          padding: '0 0.4em',
                          margin: '0em 0.357em',
                          cursor: 'pointer',
                        }}
                        key={size}
                        value={size}
                        active={size === itemsPerPage}
                        onClick={(e, o) => handleItemsPerPage(e, o)}
                      >
                        {size}
                      </Menu.Item>
                    ))}
                  </Menu.Menu>
                </div>
                <Button
                  disabled={aliasesToRemove.length === 0}
                  onClick={handleRemoveAliases}
                  primary
                >
                  <FormattedMessage
                    id="Remove selected"
                    defaultMessage="Remove selected"
                  />
                </Button>
              </Segment>
            </Form>
          </Segment.Group>
        </article>
      </Container>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link className="item" to="#" onClick={() => onCancel()}>
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
    </div>
  );
};

export default Aliases;
