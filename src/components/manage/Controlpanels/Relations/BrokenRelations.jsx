import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Segment, Table } from 'semantic-ui-react';
import { queryRelations } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

const BrokenRelations = () => {
  const dispatch = useDispatch();
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
        {Object.keys(brokenRelations.items).map((el) => (
          <div>
            <Divider section hidden />
            <h4>{el}</h4>
            <Table>
              {brokenRelations.items[el].map((el) => (
                <Table.Row>
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
