import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getVocabulary } from '@plone/volto/actions';
import { useVocabularies } from '@plone/volto/hooks';
const vocabulary = 'plone.app.vocabularies.Keywords';

const SearchTags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVocabulary({ vocabNameOrURL: vocabulary }));
  }, [dispatch]);

  const items = useVocabularies(vocabulary);

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

export default SearchTags;
