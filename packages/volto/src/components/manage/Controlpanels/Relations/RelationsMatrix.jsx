import React, { useEffect, useState } from 'react';
import { capitalize, find } from 'lodash';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Header,
  Input,
  Popup,
  Tab,
} from 'semantic-ui-react';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { messages } from '@plone/volto/helpers';
import { Icon, Toast } from '@plone/volto/components';
import {
  getRelationStats,
  queryRelations,
  rebuildRelations,
} from '@plone/volto/actions';
import RelationsListing from './RelationsListing';
import BrokenRelations from './BrokenRelations';
import helpSVG from '@plone/volto/icons/help.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const RelationsMatrix = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [query_source, setQuery_source] = useState('');
  const [query_target, setQuery_target] = useState('');
  const [potential_targets_path, setPotential_targets_path] = useState('');
  const [potential_sources_path, setPotential_sources_path] = useState('');
  const [relationtype, setRelationtype] = useState(undefined);

  const actions = useSelector((state) => state.actions?.actions ?? {});
  const can_fix_relations = find(actions.user, {
    id: 'plone_setup',
  });

  const relationtypes = useSelector(
    (state) => state.relations?.stats?.data?.stats,
  );
  const relationsListError = useSelector(
    (state) => state.relations?.stats?.error?.response?.body?.error,
  );
  const brokenRelations = useSelector(
    (state) => state.relations?.stats?.data?.broken,
  );

  let filter_options = useSelector((state) => state.groups.filter_groups);
  if (filter_options) {
    filter_options = filter_options.map((group) => ({
      value: group.id,
      label: group.title || group.id,
    }));
    filter_options.sort(function (a, b) {
      var labelA = a.label.toUpperCase();
      var labelB = b.label.toUpperCase();
      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    dispatch(getRelationStats());
  }, [dispatch]);

  const onReset = (event) => {
    let element = event.target.querySelector('input');
    element.value = '';
    element.focus();
    let searchtype = element.name;
    switch (searchtype) {
      case 'SearchY':
        setQuery_source('');
        break;
      case 'SearchX':
        setQuery_target('');
        break;
      case 'showPotentialTargets':
        setPotential_targets_path('/');
        break;
      case 'showPotentialSources':
        setPotential_sources_path('/');
        break;
      default:
        break;
    }
  };

  // search for sources
  const onChangeSearchYs = (event) => {
    if (event.target.value.length > 1) {
      setQuery_source(event.target.value);
    } else {
      setQuery_source('');
    }
  };

  // search for targets
  const onChangeSearchXs = (event) => {
    if (event.target.value.length > 1) {
      setQuery_target(event.target.value);
    } else {
      setQuery_source('');
    }
  };

  const onChangeRelation = (event, { value }) => {
    setRelationtype(value);
  };

  const onChangeShowPotentialSources = (_value) => {
    let newValue = _value;
    setPotential_sources_path(newValue);
  };

  const onChangeShowPotentialTargets = (_value) => {
    let newValue = _value;
    setPotential_targets_path(newValue);
  };

  const rebuildRelationsHandler = (flush = false) => {
    dispatch(rebuildRelations(flush))
      .then(() => {
        dispatch(getRelationStats());
        dispatch(queryRelations(null, true, 'broken'));
      })
      .then(() => {
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content="Relations updated"
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
        );
      });
  };

  const clear_potential_sources_path = () => {
    setPotential_sources_path('');
    // onChange(id, undefined);
  };

  const clear_potential_targets_path = () => {
    setPotential_targets_path('');
    // onChange(id, undefined);
  };

  const panes = [
    {
      menuItem: intl.formatMessage(messages.inspectRelations),
      pane: (
        <Tab.Pane attached={true} key="fix">
          {relationtypes ? (
            <div className="controlpanel_matrix">
              <div className="controlpanel_select_relation">
                <Divider hidden />
                <Form className="select_relation">
                  <Form.Field>
                    <Header as="h3">
                      <Header.Content>
                        <FormattedMessage
                          id="Relation name"
                          defaultMessage="Relation"
                        />{' '}
                        <Dropdown
                          placeholder={
                            relationtype ||
                            intl.formatMessage(messages.selectRelation)
                          }
                        >
                          <Dropdown.Menu>
                            {Object.keys(relationtypes).map((relationtype) => (
                              <Dropdown.Item
                                onClick={onChangeRelation}
                                value={relationtype}
                                className={`select-relation-${relationtype}`}
                                key={relationtype}
                              >
                                {`${relationtype} (${relationtypes[relationtype]})`}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Header.Content>
                    </Header>
                  </Form.Field>
                </Form>
              </div>
              {relationtype ? (
                <>
                  <div className="controlpanel_search_wrapper">
                    <div className="controlpanel_search_y">
                      <Header as="h4">
                        <Header.Content>
                          <FormattedMessage
                            id="Source"
                            defaultMessage="Source"
                          />
                        </Header.Content>
                      </Header>
                      <Form className="search_y" onSubmit={onReset}>
                        <Form.Field>
                          <Input
                            name="SearchY"
                            placeholder={intl.formatMessage(
                              messages.searchRelationSource,
                            )}
                            onChange={onChangeSearchYs}
                            id="y-search-input"
                          />
                          <Button.Group>
                            <Button
                              basic
                              className="cancel"
                              aria-label="cancel"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                document.querySelector(
                                  'input[name="SearchY"]',
                                ).value = '';
                                setQuery_source('');
                              }}
                            >
                              <Icon name={clearSVG} size="24px" />
                            </Button>
                          </Button.Group>
                        </Form.Field>
                      </Form>
                      <Form
                        className="add_potential_sources"
                        onSubmit={onReset}
                      >
                        <Form.Field>
                          <Input
                            name="showPotentialSources"
                            type="url"
                            value={potential_sources_path}
                            placeholder={intl.formatMessage(
                              messages.addPotentialSourcesPath,
                            )}
                            onChange={({ target }) =>
                              onChangeShowPotentialSources(target.value)
                            }
                            id="potential-sources-path-input"
                          />
                          {potential_sources_path?.length > 0 ? (
                            <Button.Group>
                              <Button
                                basic
                                className="cancel"
                                aria-label="clearUrlBrowser"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  clear_potential_sources_path();
                                }}
                              >
                                <Icon name={clearSVG} size="24px" />
                              </Button>
                            </Button.Group>
                          ) : (
                            <Button.Group>
                              <Button
                                basic
                                icon
                                aria-label="openUrlBrowser"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  props.openObjectBrowser({
                                    mode: 'link',
                                    overlay: true,
                                    onSelectItem: (url) => {
                                      onChangeShowPotentialSources(url);
                                    },
                                  });
                                }}
                              >
                                <Icon name={navTreeSVG} size="24px" />
                              </Button>
                            </Button.Group>
                          )}
                        </Form.Field>
                        <FormattedMessage
                          id="Show potential sources. Not only objects that are source of some relation."
                          defaultMessage="Show potential sources. Not only objects that are source of some relation."
                        />
                      </Form>
                    </div>
                    <div className="controlpanel_search_x">
                      <Form className="search_x" onSubmit={onReset}>
                        <Header as="h4">
                          <Header.Content>
                            <FormattedMessage
                              id="Target"
                              defaultMessage="Target"
                            />
                          </Header.Content>
                        </Header>
                        <Form.Field>
                          <Input
                            name="SearchX"
                            placeholder={intl.formatMessage(
                              messages.searchRelationTarget,
                            )}
                            onChange={onChangeSearchXs}
                            id="x-search-input"
                          />
                          <Button.Group>
                            <Button
                              basic
                              className="cancel"
                              aria-label="cancel"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                document.querySelector(
                                  'input[name="SearchX"]',
                                ).value = '';
                                setQuery_target('');
                              }}
                            >
                              <Icon name={clearSVG} size="24px" />
                            </Button>
                          </Button.Group>
                        </Form.Field>
                      </Form>
                      <Form
                        className="add_potential_targets"
                        onSubmit={onReset}
                      >
                        <Form.Field>
                          <Input
                            name="showPotentialTargets"
                            type="url"
                            value={potential_targets_path}
                            placeholder={intl.formatMessage(
                              messages.addPotentialTargetsPath,
                            )}
                            onChange={({ target }) =>
                              onChangeShowPotentialTargets(target.value)
                            }
                            id="potential-targets-path-input"
                          />
                          {potential_targets_path?.length > 0 ? (
                            <Button.Group>
                              <Button
                                basic
                                className="cancel"
                                aria-label="clearUrlBrowser"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  clear_potential_targets_path();
                                }}
                              >
                                <Icon name={clearSVG} size="24px" />
                              </Button>
                            </Button.Group>
                          ) : (
                            <Button.Group>
                              <Button
                                basic
                                icon
                                aria-label="openUrlBrowser"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  props.openObjectBrowser({
                                    mode: 'link',
                                    overlay: true,
                                    onSelectItem: (url) => {
                                      onChangeShowPotentialTargets(url);
                                    },
                                  });
                                }}
                              >
                                <Icon name={navTreeSVG} size="24px" />
                              </Button>
                            </Button.Group>
                          )}
                        </Form.Field>
                        <div className="foo">
                          <FormattedMessage
                            id="Show potential targets. Not only objects that are target of some relation."
                            defaultMessage="Show potential targets. Not only objects that are target of some relation."
                          />{' '}
                          <Popup
                            trigger={
                              <a
                                href="https://6.docs.plone.org/volto/recipes/widget.html#restricting-potential-targets"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Icon name={helpSVG} size="16px" />
                              </a>
                            }
                          >
                            <Popup.Header>Respect constraints</Popup.Header>
                            <Popup.Content>
                              <div>
                                See docs.plone.org on how to respect
                                constraints.
                              </div>
                            </Popup.Content>
                          </Popup>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className="controlpanel_listing_wrapper">
                    <RelationsListing
                      relationtype={relationtype}
                      query_source={query_source}
                      query_target={query_target}
                      potential_targets_path={potential_targets_path}
                      potential_sources_path={potential_sources_path}
                    />
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <p>
              <b>{relationsListError?.type}</b> {relationsListError?.message}
            </p>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: intl.formatMessage(messages.fixRelations),
      pane: (
        <Tab.Pane attached={true} key="rebuild">
          <div>
            {!(brokenRelations && Object.keys(brokenRelations).length > 0) && (
              <div>
                <FormattedMessage
                  id="No broken relations found."
                  defaultMessage="No broken relations found."
                />
              </div>
            )}
            {can_fix_relations ? (
              <React.Fragment>
                <Divider hidden />
                <h2>
                  {capitalize(intl.formatMessage(messages.rebuildRelations))}
                </h2>

                <Button.Group>
                  <Button
                    primary
                    onClick={() => rebuildRelationsHandler(false)}
                    content={intl.formatMessage(messages.rebuildRelations)}
                    aria-label={intl.formatMessage(messages.rebuildRelations)}
                  />
                </Button.Group>

                <Divider hidden />
                <h2>
                  {capitalize(
                    intl.formatMessage(messages.flushAndRebuildRelations),
                  )}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage(
                      messages.flushAndRebuildRelationsHints,
                    ),
                  }}
                />
                <Divider hidden />
                <Button.Group>
                  <Button
                    secondary
                    color="red"
                    onClick={() => rebuildRelationsHandler(true)}
                    content={intl.formatMessage(
                      messages.flushAndRebuildRelations,
                    )}
                    aria-label={intl.formatMessage(
                      messages.flushAndRebuildRelations,
                    )}
                  />
                </Button.Group>
              </React.Fragment>
            ) : null}
            <BrokenRelations />
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      panes={panes}
      renderActiveOnly={false}
      menu={{ secondary: true, pointing: true, attached: true, tabular: true }}
    />
  );
};

export default compose(withObjectBrowser)(RelationsMatrix);
