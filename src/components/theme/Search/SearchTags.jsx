import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getVocabulary } from '@plone/volto/actions';
import { useVocabularies } from '@plone/volto/hooks/vocabularies/useVocabularies';
const vocabulary = 'plone.app.vocabularies.Keywords';

const SearchTags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVocabulary({ vocabNameOrURL: vocabulary }));
  }, [dispatch]);

  const items = useVocabularies();

  return items && items.length > 0 ? (
    <div>
      {items.map((item) => (
        <Link
          className="ui label"
          to={`/search?Subject=${item.label}`}
          key={item.label}
        >
          {item.label}
        </Link>
      ))}
    </div>
  ) : (
    <span />
  );
};

SearchTags.propTypes = {
  getVocabulary: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default SearchTags;
