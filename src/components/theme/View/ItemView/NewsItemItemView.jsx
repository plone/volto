import { ConditionalLink } from '@plone/volto/components';
import { parseDateTime } from '@plone/volto/helpers';
import { useIntl } from 'react-intl';
import { format, parse } from 'date-fns';

const NewsItemItemView = ({ item, isEditMode }) => {
  console.log(item);
  const intl = useIntl();
  return (
    <div
      className={`listing-item ${item['@type']
        .replace(' ', '-')
        .toLowerCase()}`}
      key={item['@id']}
    >
      <ConditionalLink item={item} condition={!isEditMode}>
        <div className="listing-body">
          <span>{format(parse(item.effective), 'DD MMMM YY')}</span>
          <h4>{item.title ? item.title : item.id}</h4>
          <p>{item.description}</p>
        </div>
      </ConditionalLink>
    </div>
  );
};

export default NewsItemItemView;
