import { useEffect } from 'react';
import { Helmet, usePrevious } from '@plone/volto/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { filter, isEqual, map } from 'lodash';
import { Container, Button, Dropdown, Grid, Table } from 'semantic-ui-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Portal } from 'react-portal';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import qs from 'query-string';

import { getDiff, getSchema, getHistory } from '@plone/volto/actions';

import { useClient } from '@plone/volto/hooks';
import {
  getBaseUrl,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
} from '@plone/volto/helpers';
import {
  DiffField,
  FormattedDate,
  Icon,
  Toolbar,
  Unauthorized,
} from '@plone/volto/components';

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

const Diff = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isClient = useClient();
  const { pathname, search } = useLocation();
  const data = useSelector((state) => state.diff.data);
  const historyEntries = useSelector((state) => state.history.entries);
  const schema = useSelector((state) => state.schema.schema);
  const error = useSelector((state) => state.diff.error);
  const one = qs.parse(search).one;
  const two = qs.parse(search).two;
  const view = qs.parse(search).view || 'split';
  const title = useSelector((state) => state.content.data?.title);
  const type = useSelector((state) => state.content.data?.['@type']);
  const prevpathname = usePrevious(pathname);
  const prevone = usePrevious(one);
  const prevtwo = usePrevious(two);
  const history = useHistory();

  useEffect(() => {
    dispatch(getSchema(type));
    dispatch(getHistory(getBaseUrl(pathname)));
    dispatch(getDiff(getBaseUrl(pathname), one, two));
  }, [dispatch, type, pathname, one, two]);

  useEffect(() => {
    if (prevpathname !== pathname || prevone !== one || prevtwo !== two) {
      dispatch(getDiff(getBaseUrl(pathname), one, two));
    }
  }, [dispatch, pathname, one, two, prevone, prevtwo, prevpathname]);

  const onSelectView = (event, { value }) => {
    history.push(`${pathname}?one=${one}&two=${two}&view=${value}`);
  };

  const onChangeOne = (event, { value }) => {
    history.push(`${pathname}?one=${value}&two=${two}&view=${view}`);
  };

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
            one: one,
            two: two,
            title: title,
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
              (view) => (
                <Button
                  key={view.id}
                  value={view.id}
                  active={view === view.id}
                  onClick={onSelectView}
                >
                  {view.label}
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
      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
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
          />
        </Portal>
      )}
    </Container>
  );
};

export default Diff;
