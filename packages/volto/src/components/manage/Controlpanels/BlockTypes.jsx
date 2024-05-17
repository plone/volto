import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlockTypes } from '../../../actions/blockTypesIndex/blockTypesIndex';
import { UniversalLink, Icon, Toolbar } from '@plone/volto/components';
import { getParentUrl } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';
import { map, keys, sum } from 'lodash';
import { blocksConfig } from '@plone/volto/config/Blocks';

const BlockTypesControlpanel = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);
  const [displayingType, setDisplayingType] = useState('');

  useEffect(() => {
    const allBlockTypes = Object.keys(blocksConfig).join(',');
    dispatch(getBlockTypes(`${allBlockTypes}`));
  }, [dispatch]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleTable = (id) => {
    setDisplayingType(id);
  };

  const blocktypes = useSelector((state) => state.blocktypes?.items) || {};

  const result = map(keys(blocktypes), (type) =>
    // console.log(blocktypes[type]),
    ({
      type,
      total_sum: sum(
        map(keys(blocktypes[type]), (url) => blocktypes[type][url]),
      ),
      info: map(Object.entries(blocktypes[type])),
    }),
  );

  return (
    <>
      <div id="page-controlpanel" className="ui container">
        {displayingType === '' ? (
          <table>
            <tr>
              <th>Type</th>
              <th>Total</th>
            </tr>
            {result.map((blocktype) => {
              return (
                <tr>
                  <td onClick={() => toggleTable(blocktype.type)}>
                    {blocktype.type}
                  </td>
                  <td>{blocktype.total_sum}</td>
                </tr>
              );
            })}
          </table>
        ) : (
          <table>
            <tr>
              <th>Location</th>
              <th>Total</th>
            </tr>
            {result
              .find((item) => item.type === displayingType)
              ?.info.map(([url, amount]) => {
                return (
                  <tr>
                    <td>
                      <UniversalLink href={url}>{url}</UniversalLink>
                    </td>
                    <td>{amount}</td>
                  </tr>
                );
              })}
          </table>
        )}
      </div>

      {isClient &&
        createPortal(
          <Toolbar
            pathname={location.pathname}
            hideDefaultViewButtons
            inner={
              <Link
                className="item"
                to="#"
                onClick={() => {
                  displayingType === ''
                    ? history.push(getParentUrl(location.pathname))
                    : setDisplayingType('');
                }}
              >
                <Icon name={backSVG} className="contents circled" size="30px" />
              </Link>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </>
  );
};

export default BlockTypesControlpanel;
