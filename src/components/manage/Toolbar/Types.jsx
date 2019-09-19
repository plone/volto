import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filter, map } from 'lodash';

const Types = ({ types, pathname }) => {
  return types.length > 0 ? (
    <div className="menu-more pastanaga-menu">
      <header>Add content...</header>
      <div className="pastanaga-menu-list">
        <ul>
          {map(filter(types), item => (
            <li key={item['@id']}>
              <Link
                to={`${pathname}/add?type=${
                  item['@id'].split('@types/')[1]
                }`.replace(/\/\//g, '/')}
                id={`toolbar-add-${item['@id']
                  .split('@types/')[1]
                  .toLowerCase()
                  .replace(' ', '-')}`}
                className="item"
                key={item.title}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <span />
  );
};

Types.propTypes = {
  pathname: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      addable: PropTypes.bool,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(
  state => ({
    types: filter(state.types.types, 'addable'),
  }),
  {},
)(Types);
