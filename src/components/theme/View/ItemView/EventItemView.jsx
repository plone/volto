import { ConditionalLink } from '@plone/volto/components';
import { FormattedMessage } from 'react-intl';
import { format, parse } from 'date-fns';

const EventItemView = ({ item, isEditMode }) => {
  return (
    <div
      className={`listing-item ${item['@type'].toLowerCase()}`}
      key={item['@id']}
    >
      <ConditionalLink item={item} condition={!isEditMode}>
        <div className="listing-body">
          <h4>{item.title ? item.title : item.id}</h4>
          {/* <p>{item.description}</p> */}
          <div>
            <div>
              <h5>
                <FormattedMessage id="Details" defaultMessage="Details" />
              </h5>
              <p>
                <FormattedMessage id="Start" defaultMessage="Start" />:{' '}
                {format(parse(item?.start), 'DD MMMM YY')}
              </p>
              <p>
                <FormattedMessage id="End" defaultMessage="End" />:{' '}
                {format(parse(item?.end), 'DD MMMM YY')}
              </p>
              {item?.location && (
                <p>
                  <FormattedMessage id="Location" defaultMessage="Location" />:{' '}
                  {item.location}
                </p>
              )}
            </div>
            {(item?.contact_name ||
              item?.contact_email ||
              item?.contact_phone) && (
              <div>
                <h5>
                  <FormattedMessage id="Contact" defaultMessage="Contact" />
                </h5>
                <p>{item?.contact_name}</p>
                <p>{item?.contact_email}</p>
                <p>{item?.contact_phone}</p>
              </div>
            )}
          </div>
        </div>
      </ConditionalLink>
    </div>
  );
};

export default EventItemView;
