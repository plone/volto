import React, { useEffect, useState } from 'react';
import { capitalize, find } from 'lodash';
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

  const relationtypes = useSelector((state) => state.relations?.stats?.stats);
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
      })
      .then(() => {
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
                  <div className="controlpanel_search_y">
                    <Header as="h4">
                      <Header.Content>
                        <FormattedMessage id="Source" defaultMessage="Source" />
                      </Header.Content>
                    </Header>
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
          {brokenRelations && Object.keys(brokenRelations).length > 0 ? (
            <div>
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
                  <ul>
                    <li>
                      Regenerate intIds (tokens of relations in relation
                      catalog)
                    </li>
                    <li>Rebuild relations</li>
                  </ul>
                  <p>Check the log for details!</p>
                  <p>
                    <b>Warning</b>: If you have add-ons relying on intIds, you
                    should not flush them.
                  </p>
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
          ) : (
            <div>
              <FormattedMessage
                id="No broken relations found."
                defaultMessage="No broken relations found."
              />
            </div>
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
