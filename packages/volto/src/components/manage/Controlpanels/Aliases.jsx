import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getBaseUrl, getParentUrl, Helmet } from '@plone/volto/helpers';
import {
  removeAliases,
  addAliases,
  getAliases,
  uploadAliases,
} from '@plone/volto/actions/aliases/aliases';
import { createPortal } from 'react-dom';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Input,
  Loader,
  Menu,
  Pagination,
  Radio,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import DatetimeWidget from '@plone/volto/components/manage/Widgets/DatetimeWidget';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { ModalForm } from '@plone/volto/components/manage/Form';
import { Icon, Toolbar } from '@plone/volto/components';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import { useClient } from '@plone/volto/hooks';

import backSVG from '@plone/volto/icons/back.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
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
  AddUrl: {
    id: 'Add Alternative URL',
    defaultMessage: 'Add Alternative URL',
  },
  EditUrl: {
    id: 'Edit Alternative URL',
    defaultMessage: 'Edit Alternative URL',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  successAdd: {
    id: 'Alias has been added',
    defaultMessage: 'Alias has been added',
  },
  successUpload: {
    id: 'Aliases have been uploaded.',
    defaultMessage: 'Aliases have been uploaded.',
  },
  filterByPrefix: {
    id: 'Filter by prefix',
    defaultMessage: 'Filter by path',
  },
  manualOrAuto: {
    id: 'Manually or automatically added?',
    defaultMessage: 'Manually or automatically added?',
  },
  createdAfter: {
    id: 'Created after',
    defaultMessage: 'Created after',
  },
  createdBefore: {
    id: 'Created before',
    defaultMessage: 'Created before',
  },
  altUrlPathTitle: {
    id: 'Alternative url path (Required)',
    defaultMessage: 'Alternative URL path (Required)',
  },
  altUrlError: {
    id: 'Alternative url path must start with a slash.',
    defaultMessage: 'Alternative URL path must start with a slash.',
  },
  targetUrlPathTitle: {
    id: 'Target Path (Required)',
    defaultMessage: 'Target Path (Required)',
  },
  BulkUploadAltUrls: {
    id: 'BulkUploadAltUrls',
    defaultMessage: 'Bulk upload CSV',
  },
  CSVFile: {
    id: 'CSVFile',
    defaultMessage: 'CSV file',
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

  const hasAdvancedFiltering = useSelector(
    (state) => state.site.data?.features?.filter_aliases_by_date,
  );
  const hasBulkUpload = hasAdvancedFiltering !== undefined;
  const aliases = useSelector((state) => state.aliases);
  const [filterType, setFilterType] = useState(filterChoices[0]);
  const [createdBefore, setCreatedBefore] = useState(null);
  const [createdAfter, setCreatedAfter] = useState(null);
  const [aliasesToRemove, setAliasesToRemove] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addError, setAddError] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const isClient = useClient();

  const updateResults = useCallback(() => {
    const options = {
      query: filterQuery,
      manual: filterType.value,
      batchStart: (activePage - 1) * itemsPerPage,
      batchSize: itemsPerPage === 'All' ? 999999999999 : itemsPerPage,
    };
    if (hasAdvancedFiltering) {
      options.start = createdAfter || '';
      options.end = createdBefore || '';
    } else {
      options.datetime = createdBefore || '';
    }
    dispatch(getAliases(getBaseUrl(pathname), options));
  }, [
    activePage,
    createdAfter,
    createdBefore,
    dispatch,
    filterQuery,
    filterType.value,
    hasAdvancedFiltering,
    itemsPerPage,
    pathname,
  ]);

  // Update results after changing the page.
  // (We intentionally leave updateResults out of the deps.)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateResults(), [activePage, itemsPerPage]);

  // Calculate page count from results
  const pages = useMemo(() => {
    let pages = Math.ceil(aliases.items_total / itemsPerPage);
    if (pages === 0 || isNaN(pages)) {
      pages = '';
    }
    return pages;
  }, [aliases.items_total, itemsPerPage]);

  // Add new alias
  const handleAdd = (formData) => {
    const { altUrlPath, targetUrlPath } = formData;
    // Validate altUrlPath starts with a slash
    if (!altUrlPath || altUrlPath.charAt(0) !== '/') {
      setAddError(intl.formatMessage(messages.altUrlError));
      return;
    }
    // Remove existing alias first if we're editing it.
    const precondition = editingData
      ? dispatch(
          removeAliases('', { items: [{ path: editingData.altUrlPath }] }),
        )
      : Promise.resolve();
    precondition.then(() => {
      dispatch(
        addAliases('', {
          items: [{ path: altUrlPath, 'redirect-to': targetUrlPath }],
        }),
      )
        .then(() => {
          updateResults();
          setAddModalOpen(false);
          setEditingData(null);
          toast.success(
            <Toast
              success
              title={intl.formatMessage(messages.success)}
              content={intl.formatMessage(messages.successAdd)}
            />,
          );
        })
        .catch((error) => {
          setAddError(error.response?.body?.message);
        });
    });
  };

  // Check/uncheck an alias
  const handleCheckAlias = (alias) => {
    if (aliasesToRemove.includes(alias)) {
      setAliasesToRemove(aliasesToRemove.filter((x) => x !== alias));
    } else {
      setAliasesToRemove([...aliasesToRemove, alias]);
    }
  };

  // Remove selected aliases
  const handleRemoveAliases = () => {
    dispatch(
      removeAliases('', {
        items: aliasesToRemove.map((a) => ({ path: a })),
      }),
    ).then(updateResults);
    setAliasesToRemove([]);
  };

  // Upload CSV
  const handleBulkUpload = (formData) => {
    fetch(`data:${formData.file['content-type']};base64,${formData.file.data}`)
      .then((res) => res.blob())
      .then((blob) => {
        dispatch(uploadAliases(blob))
          .then(() => {
            updateResults();
            setUploadError(null);
            setUploadModalOpen(false);
            toast.success(
              <Toast
                success
                title={intl.formatMessage(messages.success)}
                content={intl.formatMessage(messages.successUpload)}
              />,
            );
          })
          .catch((error) => {
            setUploadError(error.response?.body?.message);
          });
      });
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
            <Segment>
              <Button
                primary
                id="add-alt-url"
                onClick={() => setAddModalOpen(true)}
              >
                {intl.formatMessage(messages.AddUrl)}&hellip;
              </Button>
              {addModalOpen && (
                <ModalForm
                  open={true}
                  onSubmit={handleAdd}
                  onCancel={() => setAddModalOpen(false)}
                  title={
                    editingData
                      ? intl.formatMessage(messages.EditUrl)
                      : intl.formatMessage(messages.AddUrl)
                  }
                  submitError={addError}
                  schema={{
                    fieldsets: [
                      {
                        id: 'default',
                        fields: ['altUrlPath', 'targetUrlPath'],
                      },
                    ],
                    properties: {
                      altUrlPath: {
                        title: intl.formatMessage(messages.altUrlPathTitle),
                        description: (
                          <FormattedMessage
                            id="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only URLs that result in a 404 not found page will result in a redirect occurring."
                            defaultMessage="Enter the absolute path where the alternative URL should exist. The path must start with '/'. Only URLs that result in a 404 not found page will result in a redirect occurring."
                          />
                        ),
                        placeholder: '/example',
                      },
                      targetUrlPath: {
                        title: intl.formatMessage(messages.targetUrlPathTitle),
                        description: (
                          <FormattedMessage
                            id="Enter the absolute path of the target. Target must exist or be an existing alternative url path to the target."
                            defaultMessage="Enter the absolute path of the target. Target must exist or be an existing alternative URL path to the target."
                          />
                        ),
                        placeholder: '/example',
                      },
                    },
                    required: ['altUrlPath', 'targetUrlPath'],
                  }}
                  formData={editingData}
                />
              )}
              {hasBulkUpload && (
                <>
                  <Button onClick={() => setUploadModalOpen(true)}>
                    {intl.formatMessage(messages.BulkUploadAltUrls)}&hellip;
                  </Button>
                  {uploadModalOpen && (
                    <ModalForm
                      open={true}
                      onSubmit={handleBulkUpload}
                      onCancel={() => setUploadModalOpen(false)}
                      title={intl.formatMessage(messages.BulkUploadAltUrls)}
                      submitError={uploadError}
                      description={
                        <>
                          <p>
                            <FormattedMessage
                              id="bulkUploadUrlsHelp"
                              defaultMessage="Add many alternative URLs at once by uploading a CSV file. The first column should be the path to redirect from; the second, the path to redirect to. Both paths must be Plone-site-relative, starting with a slash (/). An optional third column can contain a date and time. An optional fourth column can contain a boolean to mark as a manual redirect (default true)."
                            />
                          </p>
                          <p>
                            Example:
                            <br />
                            <code>
                              /old-home-page.asp,/front-page,2019/01/27 10:42:59
                              GMT+1,true
                              <br />
                              /people/JoeT,/Users/joe-thurston,2018-12-31,false
                            </code>
                          </p>
                        </>
                      }
                      schema={{
                        fieldsets: [
                          {
                            id: 'default',
                            fields: ['file'],
                          },
                        ],
                        properties: {
                          file: {
                            title: intl.formatMessage(messages.CSVFile),
                            type: 'object',
                            factory: 'File Upload',
                          },
                        },
                        required: ['file'],
                      }}
                    />
                  )}
                </>
              )}
            </Segment>
            <Segment>
              <Form>
                <Header size="medium">
                  <FormattedMessage
                    id="All existing alternative urls for this site"
                    defaultMessage="Existing alternative URLs for this site"
                  />
                </Header>
                <Segment>
                  <Form.Field>
                    <FormFieldWrapper
                      id="filterQuery"
                      title={intl.formatMessage(messages.filterByPrefix)}
                    >
                      <Input
                        name="filter"
                        placeholder="/example"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                      />
                    </FormFieldWrapper>
                  </Form.Field>
                  <Form.Field>
                    <FormFieldWrapper
                      id="filterType"
                      title={intl.formatMessage(messages.manualOrAuto)}
                    >
                      <Form.Group inline>
                        {filterChoices.map((o, i) => (
                          <Form.Field key={i}>
                            <Radio
                              label={o.label}
                              name="radioGroup"
                              value={o.value}
                              checked={filterType === o}
                              onChange={() => setFilterType(o)}
                            />
                          </Form.Field>
                        ))}
                      </Form.Group>
                    </FormFieldWrapper>
                  </Form.Field>
                  <Form.Field>
                    <DatetimeWidget
                      id="created-before-date"
                      title={intl.formatMessage(messages.createdBefore)}
                      dateOnly={true}
                      value={createdBefore}
                      onChange={(id, value) => {
                        setCreatedBefore(value);
                      }}
                    />
                  </Form.Field>
                  {hasAdvancedFiltering && (
                    <Form.Field>
                      <DatetimeWidget
                        id="created-after-date"
                        title={intl.formatMessage(messages.createdAfter)}
                        dateOnly={true}
                        value={createdAfter}
                        onChange={(id, value) => {
                          setCreatedAfter(value);
                        }}
                      />
                    </Form.Field>
                  )}
                  <Button onClick={() => updateResults()} primary>
                    Filter
                  </Button>
                </Segment>
              </Form>
            </Segment>
            <Segment>
              <Header size="small">
                <FormattedMessage
                  id="Alternative url path → target url path (date and time of creation, manually created yes/no)"
                  defaultMessage="Alternative URL path → target URL path (date and time of creation, manually created yes/no)"
                />
              </Header>

              <Table celled compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width="1">
                      <FormattedMessage id="Select" defaultMessage="Select" />
                    </Table.HeaderCell>
                    <Table.HeaderCell width="10">
                      <FormattedMessage id="Alias" defaultMessage="Alias" />
                    </Table.HeaderCell>
                    <Table.HeaderCell width="1">
                      <FormattedMessage id="Date" defaultMessage="Date" />
                    </Table.HeaderCell>
                    <Table.HeaderCell width="1">
                      <FormattedMessage id="Manual" defaultMessage="Manual" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {aliases.get.loading && (
                    <Table.Row>
                      <Table.Cell colSpan="4">
                        <Loader active inline="centered" />
                      </Table.Cell>
                    </Table.Row>
                  )}
                  {aliases.items.length > 0 &&
                    aliases.items.map((alias, i) => (
                      <Table.Row key={i} verticalAlign="top">
                        <Table.Cell>
                          <Checkbox
                            onChange={(e, { value }) => handleCheckAlias(value)}
                            checked={aliasesToRemove.includes(alias.path)}
                            value={alias.path}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          {alias.path}
                          <br />
                          &nbsp;&nbsp;&rarr; {alias['redirect-to']}{' '}
                          <Button
                            basic
                            style={{ verticalAlign: 'middle' }}
                            aria-label={intl.formatMessage(messages.EditUrl)}
                            onClick={() => {
                              setEditingData({
                                altUrlPath: alias.path,
                                targetUrlPath: alias['redirect-to'],
                              });
                              setAddModalOpen(true);
                            }}
                          >
                            <Icon name={editingSVG} size="18px" />
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <FormattedDate date={alias.datetime} />
                        </Table.Cell>
                        <Table.Cell>{`${alias.manual}`}</Table.Cell>
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
                    onPageChange={(e, { activePage }) =>
                      setActivePage(activePage)
                    }
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
                      onClick={(e, { value }) => {
                        setItemsPerPage(value);
                        setActivePage(1);
                      }}
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
          </Segment.Group>
        </article>
      </Container>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link
                className="item"
                to="#"
                onClick={() => history.push(getParentUrl(pathname))}
              >
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
