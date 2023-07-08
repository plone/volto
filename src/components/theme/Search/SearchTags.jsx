import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

import { getVocabulary } from '@plone/volto/actions';

const vocabulary = 'plone.app.vocabularies.Keywords';

const SearchTags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVocabulary({ vocabNameOrURL: vocabulary }));
  }, [dispatch]);

  const items = useSelector(
    (state) =>
      state.vocabularies[vocabulary] && state.vocabularies[vocabulary].items
        ? state.vocabularies[vocabulary].items
        : [],
    shallowEqual,
  );

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
