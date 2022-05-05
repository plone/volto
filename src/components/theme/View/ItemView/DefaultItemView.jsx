import { ConditionalLink } from '@plone/volto/components';

const DefaultItemView = ({ item, isEditMode }) => {
  return (
    <div className="listing-item" key={item['@id']}>
      <ConditionalLink item={item} condition={!isEditMode}>
        <div className="listing-body">
          <h4>{item.title ? item.title : item.id}</h4>
          <p>{item.description}</p>
        </div>
      </ConditionalLink>
    </div>
  );
};

export default DefaultItemView;
