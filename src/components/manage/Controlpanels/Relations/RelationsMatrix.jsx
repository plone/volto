import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { Checkbox, Dropdown, Form, Input, Tab } from 'semantic-ui-react';
// import { isEqual, pull } from 'lodash';
import { messages } from '@plone/volto/helpers';
import { listRelations } from '@plone/volto/actions';
import { Toast } from '@plone/volto/components';
import RelationsListing from './RelationsListing';

const RelationsMatrix = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [query_source, setQuery_source] = useState('');
  const [query_target, setQuery_target] = useState('');
  const [query_target_filter, setQuery_target_filter] = useState('');
  // const [target_filter, setTarget_filter] = useState([]); // Show source with these targets.
  const [relationtype, setRelationtype] = useState(undefined);
  let relationtypes =
    useSelector((state) => state.relations?.stats?.relations) || {};

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
    dispatch(listRelations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listRelations(relationtype, query_target_filter));
  }, [dispatch, relationtype, query_target_filter, props]);

  const onReset = (event) => {
    // event.preventDefault();
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
      case 'SearchXFilter':
        setQuery_target_filter('');
        break;
      default:
        break;
    }
  };

  const onChangeSearchYs = (event) => {
    setQuery_source(event.target.value);
  };

  const onChangeSearchXs = (event) => {
    setQuery_target(event.target.value);
  };

  // const onSelectOptionHandler = (filter_option, checked) => {
  //   let target_filter_set_new = [];
  //   if (checked) {
  //     target_filter_set_new = new Set([...target_filter, filter_option.value]);
  //   } else {
  //     target_filter_set_new = pull(target_filter, filter_option.value);
  //   }
  //   if (!isEqual(target_filter_set_new, new Set(target_filter))) {
  //     setTarget_filter([...target_filter_set_new]);
  //   }
  // };

  // const onChangeSearchXsFilter = (event) => {
  //   setQuery_target_filter(event.target.value);
  // };

  const onChangeRelation = (event, { value }) => {
    setRelationtype(value);
  };

  const onChangeShowPotentialTargets = () => {
    toast.warning(
      <Toast
        warning
        title="add or remove relation"
        content="not yet implemented"
      />,
    );
  };

  const panes = [
    {
      menuItem: intl.formatMessage(messages.inspectRelations),
      pane: (
        <Tab.Pane attached={false} key="fix">
          <div className="controlpanel_matrix">
            <div className="controlpanel_select_relation">
              <Form className="select_relation">
                <Form.Field>
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
                          text={relationtype}
                          className={`select-relation-${relationtype}`}
                          key={relationtype}
                        >
                          {`${relationtype} (${relationtypes[relationtype]})`}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Field>
              </Form>
            </div>
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
                <Form.Field>
                  <Checkbox
                    name="showPotentialTargets"
                    label="Show potential targets (not only objects that are target of some relation)"
                    title="Show potential targets"
                    defaultChecked={false}
                    onChange={onChangeShowPotentialTargets}
                  />
                </Form.Field>
              </Form>
            </div>

            {/* Possible filter:
            - path
            - content type
            - review state */}

            {/* <div className="controlpanel_filter">
              <h3>{intl.formatMessage(messages.filterByTarget)}</h3>
      
              <Form className="search_filter_groups" onSubmit={onReset}>
                <Form.Field>
                  <Input
                    name="SearchXFilter"
                    action={{ icon: 'delete' }}
                    placeholder={intl.formatMessage(messages.searchRelationTarget)}
                    onChange={onChangeSearchXsFilter}
                    id="groupfilter-search-input"
                  />
                </Form.Field>
              </Form>
      
              {filter_options?.map((filter_option) => (
                <Checkbox
                  name={`filter_option_${filter_option.value}`}
                  key={filter_option.value}
                  title={filter_option.label}
                  label={filter_option.label}
                  defaultChecked={false}
                  onChange={(event, { checked }) => {
                    onSelectOptionHandler(filter_option, checked);
                  }}
                />
              ))}
            </div> */}

            <RelationsListing
              relationtype={relationtype}
              query_source={query_source}
              query_target={query_target}
              // target_filter={target_filter}
            />
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: intl.formatMessage(messages.fixRelations),
      pane: (
        <Tab.Pane attached={false} key="rebuild">
          <div>TODO Rebuild relations</div>
          <div>
            <span>(button rebuild)</span>{' '}
            <span>(button flush and rebuild)</span>
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} renderActiveOnly={false} />;
};

export default RelationsMatrix;
