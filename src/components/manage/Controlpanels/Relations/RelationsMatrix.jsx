import React, { useEffect, useState } from 'react';
import { find } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import {
  Button,
  Dropdown,
  Form,
  Header,
  Input,
  Popup,
  Tab,
  Table,
} from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import { Icon, Toast } from '@plone/volto/components';
import { rebuildRelations, queryRelations } from '@plone/volto/actions';
import RelationsListing from './RelationsListing';
import BrokenRelations from './BrokenRelations';
import helpSVG from '@plone/volto/icons/help.svg';

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
    (state) => state.relations?.stats?.relations,
  );
  const relationsListError = useSelector(
    (state) => state.relations?.list?.error?.response?.body?.error,
  );
  const brokenRelations = useSelector(
    (state) => state.relations?.stats?.broken,
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
    dispatch(queryRelations());
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
    setQuery_source(event.target.value);
  };

  // search for targets
  const onChangeSearchXs = (event) => {
    setQuery_target(event.target.value);
  };

  const onChangeRelation = (event, { value }) => {
    setRelationtype(value);
  };

  const onChangeShowPotentialTargets = (event) => {
    setPotential_targets_path(event.target.value);
  };

  const onChangeShowPotentialSources = (event) => {
    setPotential_sources_path(event.target.value);
  };

  const rebuildRelationsHandler = (flush = false) => {
    dispatch(rebuildRelations(flush))
      .then(() => {
        dispatch(queryRelations());
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
        console.debug('error', error);
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

  const panes = [
    {
      menuItem: intl.formatMessage(messages.inspectRelations),
      pane: (
        <Tab.Pane attached={true} key="fix">
          {relationtypes ? (
            <div className="controlpanel_matrix">
              <div className="controlpanel_select_relation">
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
                  <div className="controlpanel_search_y">
                    <Form className="search_y" onSubmit={onReset}>
                      <Form.Field>
                        <Input
                          name="SearchY"
                          action={{ icon: 'delete' }}
                          placeholder={intl.formatMessage(
                            messages.searchRelationSource,
                          )}
                          onChange={onChangeSearchYs}
                          id="y-search-input"
                        />
                      </Form.Field>
                    </Form>
                    <Form className="add_potential_sources" onSubmit={onReset}>
                      <Form.Field>
                        <Input
                          name="showPotentialSources"
                          action={{ icon: 'delete' }}
                          placeholder={intl.formatMessage(
                            messages.addPotentialSourcesPath,
                          )}
                          onChange={onChangeShowPotentialSources}
                          id="potential-sources-path-input"
                        />
                      </Form.Field>
                      <FormattedMessage
                        id="Show potential sources. Not only objects that are source of some relation."
                        defaultMessage="Show potential sources. Not only objects that are source of some relation."
                      />
                    </Form>
                  </div>
                  <div className="controlpanel_search_x">
                    <Form className="search_x" onSubmit={onReset}>
                      <Form.Field>
                        <Input
                          name="SearchX"
                          action={{ icon: 'delete' }}
                          placeholder={intl.formatMessage(
                            messages.searchRelationTarget,
                          )}
                          onChange={onChangeSearchXs}
                          id="x-search-input"
                        />
                      </Form.Field>
                    </Form>
                    <Form className="add_potential_targets" onSubmit={onReset}>
                      <Form.Field>
                        <Input
                          name="showPotentialTargets"
                          action={{ icon: 'delete' }}
                          placeholder={intl.formatMessage(
                            messages.addPotentialTargetsPath,
                          )}
                          onChange={onChangeShowPotentialTargets}
                          id="potential-targets-path-input"
                        />
                      </Form.Field>
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
                            See docs.plone.org on how to respect constraints.
                          </div>
                        </Popup.Content>
                      </Popup>
                    </Form>
                  </div>
                  <RelationsListing
                    relationtype={relationtype}
                    query_source={query_source}
                    query_target={query_target}
                    potential_targets_path={potential_targets_path}
                    potential_sources_path={potential_sources_path}
                    // target_filter={target_filter}
                  />
                </>
              ) : null}
            </div>
          ) : (
            <p>{relationsListError?.message}</p>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: intl.formatMessage(messages.fixRelations),
      pane: (
        <Tab.Pane attached={true} key="rebuild">
          {brokenRelations ? (
            <div>
              <h3>
                <FormattedMessage
                  id="Broken relations"
                  defaultMessage="Broken relations"
                />
              </h3>
              <Table>
                <Table.Body>
                  {Object.keys(brokenRelations).map((el) => {
                    return (
                      <Table.Row key={el}>
                        <Table.Cell>{el}</Table.Cell>
                        <Table.Cell textAlign="right">
                          {brokenRelations[el]}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
              {can_fix_relations ? (
                <React.Fragment>
                  <h3>Rebuild relations</h3>
                  <p>
                    Get all relations from zc.relation catalog and store them in
                    an annotation on the portal. Remove all entries from
                    zc.relation catalog. Clean up intids. Restore relations from
                    the annotation on on the portal.
                  </p>

                  <Button.Group>
                    <Button
                      primary
                      onClick={() => rebuildRelationsHandler(false)}
                      title={intl.formatMessage(messages.rebuildRelations)}
                      aria-label={intl.formatMessage(messages.rebuildRelations)}
                    >
                      <FormattedMessage
                        id="rebuild relations"
                        defaultMessage="rebuild relations"
                      />
                    </Button>
                  </Button.Group>
                  <h3>Flush and rebuild intids, and rebuild relations</h3>
                  <p>
                    This will delete all intids during the rebuild process and
                    create new one. If you have a lot of relations this can take
                    some time. Check the log for details!{' '}
                  </p>
                  <p>
                    Warning: If you have relations on tiles, flushing and
                    rebuilding intids will destroy them because the intids
                    changed.
                  </p>
                  <Button.Group>
                    <Button
                      secondary
                      color="red"
                      onClick={() => rebuildRelationsHandler(true)}
                      title={intl.formatMessage(
                        messages.flushAndRebuildRelations,
                      )}
                      aria-label={intl.formatMessage(
                        messages.flushAndRebuildRelations,
                      )}
                    >
                      <FormattedMessage
                        id="flush and rebuild intids, and rebuild relations"
                        defaultMessage="flush and rebuild intids, and rebuild relations"
                      />
                    </Button>
                  </Button.Group>
                </React.Fragment>
              ) : null}
              <BrokenRelations />
            </div>
          ) : (
            <p>
              <FormattedMessage
                id="No broken relations found."
                defaultMessage="No broken relations found."
              />
            </p>
          )}
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

export default RelationsMatrix;
