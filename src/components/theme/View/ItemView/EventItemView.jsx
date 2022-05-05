import { ConditionalLink } from '@plone/volto/components';
import { FormattedMessage } from 'react-intl';

const EventItemView = ({ item, isEditMode }) => {
  return (
    <div className="listing-item" key={item['@id']}>
      <ConditionalLink item={item} condition={!isEditMode}>
        <div className="listing-body">
          <h4>{item.title ? item.title : item.id}</h4>
          <p>{item.description}</p>
          <p>
            <FormattedMessage id="Start" defaultMessage="Start" />
          </p>
          <p>
            <FormattedMessage id="End" defaultMessage="End" />
          </p>
        </div>
      </ConditionalLink>
    </div>
  );
};

export default EventItemView;
