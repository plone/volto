import type { BlockViewProps, ListingBlockFormData } from '@plone/types';
import { useTranslation } from 'react-i18next';

/**
 * View listing block component.
 * @class View
 * @extends Component
 */
const ListingBlockView = (props: BlockViewProps) => {
  const data = props.data as ListingBlockFormData;
  const HeadlineTag = data.headlineTag || 'h2';
  const ItemTitleTag = data.headlineTag === 'h2' ? 'h3' : 'h4';
  const { t } = useTranslation();

  return (
    <>
      {data.headline ? <HeadlineTag>{data.headline}</HeadlineTag> : ''}
      {!data.items || data.items?.length === 0 ? (
        <div>{t('blocks.listing.no-results')}</div>
      ) : (
        data.items.map((item) => (
          <div key={item['@id']}>
            <ItemTitleTag>
              <a href={item['@id']}>{item.title || item.id}</a>
            </ItemTitleTag>
            {item.description && <p>{item.description}</p>}
          </div>
        ))
      )}
    </>
  );
};

export default ListingBlockView;
