import React, { useEffect } from 'react';
import { uniq, uniqBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Segment, Table } from 'semantic-ui-react';
import { queryRelations } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

const BrokenRelations = () => {
  const dispatch = useDispatch();
  const brokenRelationStats = useSelector(
    (state) => state.relations?.stats?.broken,
  );
  const brokenRelations = useSelector(
    (state) => state.relations?.subrequests?.broken?.relations,
  );

  useEffect(() => {
    dispatch(queryRelations(null, true, 'broken'));
  }, [dispatch]);

  return brokenRelations ? (
    <>
      <Divider section hidden />
      <Segment>
        <h3>
          <FormattedMessage
            id="Broken relations"
            defaultMessage="Broken relations"
          />
        </h3>
        {Object.keys(brokenRelations.items).map((relationname) => (
          <div key={relationname}>
            <Divider section hidden />
            <h4>
              {brokenRelationStats[relationname]} broken <i>{relationname}</i>{' '}
              relations
            </h4>
            <Table>
              {uniqBy(brokenRelations.items[relationname], function (el) {
                return el[0];
              }).map((el) => (
                <Table.Row key={el[0]}>
                  <Table.Cell>
                    <UniversalLink
                      href={`${flattenToAppURL(el[0])}/edit`}
                      openLinkInNewTab={true}
                    >
                      {flattenToAppURL(el[0])}
                    </UniversalLink>
                  </Table.Cell>
                  <Table.Cell>{el[1]}</Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </div>
        ))}
      </Segment>
    </>
  ) : null;
};

export default BrokenRelations;
