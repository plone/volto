/**
 * Diff component.
 * @module components/manage/Diff/Diff
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import { Container, Button, Dropdown, Grid, Table } from 'semantic-ui-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import qs from 'query-string';

import { getDiff } from '@plone/volto/actions/diff/diff';
import { getSchema } from '@plone/volto/actions/schema/schema';
import { getHistory } from '@plone/volto/actions/history/history';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import DiffField from '@plone/volto/components/manage/Diff/DiffField';
import { useClient } from '@plone/volto/hooks/client/useClient';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  diff: {
    id: 'Diff',
    defaultMessage: 'Diff',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  split: {
    id: 'Split',
    defaultMessage: 'Split',
  },
  unified: {
    id: 'Unified',
    defaultMessage: 'Unified',
  },
});

/**
 * Diff component.
 * @function Diff
 * @returns {JSX.Element}
 */
function Diff(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isClient = useClient();
  const isInitialMount = useRef(true);
  const intl = useIntl();

  const data = useSelector((state) => state.diff.data);
  const historyEntries = useSelector((state) => state.history.entries);
  const schema = useSelector((state) => state.schema.schema);
  const error = useSelector((state) => state.diff.error);
  const title = useSelector((state) => state.content.data?.title);
  const type = useSelector((state) => state.content.data?.['@type']);

  const pathname = location.pathname;
  const searchParams = qs.parse(location.search);
  const one = searchParams.one;
  const two = searchParams.two;
  const view = searchParams.view || 'split';

  useEffect(() => {
    if (type) {
      dispatch(getSchema(type));
    }
    if (pathname) {
      dispatch(getHistory(getBaseUrl(pathname)));
    }
    if (pathname && one && two) {
      dispatch(getDiff(getBaseUrl(pathname), one, two));
    }
    isInitialMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    if (pathname && one && two) {
      dispatch(getDiff(getBaseUrl(pathname), one, two));
    }
  }, [pathname, one, two, dispatch]);

  /**
   * On select view handler
   * @method onSelectView
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  const onSelectView = (event, { value }) => {
    history.push(`${pathname}?one=${one}&two=${two}&view=${value}`);
  };

  /**
   * On change one handler
   * @method onChangeOne
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  const onChangeOne = (event, { value }) => {
    history.push(`${pathname}?one=${value}&two=${two}&view=${view}`);
  };

  /**
   * On change two handler
   * @method onChangeTwo
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  const onChangeTwo = (event, { value }) => {
    history.push(`${pathname}?one=${one}&two=${value}&view=${view}`);
  };

  const versions = map(
    filter(historyEntries, (entry) => 'version' in entry),
    (entry, index) => ({
      text: (
        <>
          {index === 0 ? 'Current' : entry.version}&nbsp;(
          <FormattedDate date={entry.time} long className="text" />, &nbsp;
          {entry.actor.fullname})
        </>
      ),
      value: `${entry.version}`,
      key: `${entry.version}`,
    }),
  );

  return error?.status === 401 ? (
    <Unauthorized />
  ) : (
    <Container id="page-diff">
      <Helmet title={intl.formatMessage(messages.diff)} />
      <h1>
        <FormattedMessage
          id="Difference between revision {one} and {two} of {title}"
          defaultMessage="Difference between revision {one} and {two} of {title}"
          values={{
            one,
            two,
            title,
          }}
        />
      </h1>
      <Grid>
        <Grid.Column width={9}>
          <p className="description">
            <FormattedMessage
              id="You can view the difference of the revisions below."
              defaultMessage="You can view the difference of the revisions below."
            />
          </p>
        </Grid.Column>
        <Grid.Column width={3} textAlign="right">
          <Button.Group>
            {map(
              [
                {
                  id: 'split',
                  label: intl.formatMessage(messages.split),
                },
                {
                  id: 'unified',
                  label: intl.formatMessage(messages.unified),
                },
              ],
              (viewOption) => (
                <Button
                  type="button"
                  key={viewOption.id}
                  value={viewOption.id}
                  active={view === viewOption.id}
                  onClick={onSelectView}
                >
                  {viewOption.label}
                </Button>
              ),
            )}
          </Button.Group>
        </Grid.Column>
      </Grid>
      {historyEntries.length > 0 && (
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>
                <FormattedMessage id="Base" defaultMessage="Base" />
                <Dropdown
                  onChange={onChangeOne}
                  value={one}
                  selection
                  fluid
                  options={versions}
                />
              </Table.HeaderCell>
              <Table.HeaderCell width={6}>
                <FormattedMessage id="Compare" defaultMessage="Compare" />
                <Dropdown
                  onChange={onChangeTwo}
                  value={two}
                  selection
                  fluid
                  options={versions}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      )}
      {schema &&
        data.length > 0 &&
        map(schema.fieldsets, (fieldset) =>
          map(
            fieldset.fields,
            (field) =>
              !isEqual(data[0][field], data[1][field]) &&
              field !== getBlocksFieldname(data[0]) &&
              field !== getBlocksLayoutFieldname(data[0]) && (
                <DiffField
                  key={field}
                  one={data[0][field]}
                  two={data[1][field]}
                  schema={schema.properties[field]}
                  view={view}
                />
              ),
          ),
        )}
      {schema &&
        data.length > 0 &&
        hasBlocksData(data[0]) &&
        (!isEqual(
          data[0][getBlocksFieldname(data[0])],
          data[1][getBlocksFieldname(data[1])],
        ) ||
          !isEqual(
            data[0][getBlocksLayoutFieldname(data[0])],
            data[1][getBlocksLayoutFieldname(data[1])],
          )) && (
          <DiffField
            one={data[0][getBlocksFieldname(data[0])]}
            two={data[1][getBlocksFieldname(data[1])]}
            contentOne={data[0]}
            contentTwo={data[1]}
            schema={schema.properties[getBlocksFieldname(data[0])]}
            view={view}
          />
        )}
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}/historyview`} className="item">
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
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 */
Diff.propTypes = {
  getDiff: PropTypes.func.isRequired,
  getSchema: PropTypes.func.isRequired,
  getHistory: PropTypes.func.isRequired,
  schema: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  pathname: PropTypes.string.isRequired,
  one: PropTypes.string.isRequired,
  two: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
    }),
  ).isRequired,
  historyEntries: PropTypes.arrayOf(
    PropTypes.shape({
      version: PropTypes.number,
      time: PropTypes.string,
      actor: PropTypes.shape({ fullname: PropTypes.string }),
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

/**
 * Default properties
 * @property {Object} defaultProps Default properties.
 */
Diff.defaultProps = {
  schema: null,
};

export default Diff;
