import type { BlockViewProps, Brain, ListingBlockFormData } from '@plone/types';
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

  const getPreviewImageUrl = (item: Brain) => {
    const imageField = item.image_field;
    const imageScales = item.image_scales?.[imageField][0];
    if (!imageField || !imageScales) {
      return;
    }
    return `${imageScales.base_path || item['@id'] || ''}/${imageScales.scales.thumb?.download}`;
  };

  const renderDefault = (item: Brain) => {
    return (
      <div key={item['@id']} className="item">
        <ItemTitleTag>
          <a href={item['@id']}>{item.title || item.id}</a>
        </ItemTitleTag>
        {item.description && <p>{item.description}</p>}
      </div>
    );
  };

  const renderSummary = (item: Brain) => {
    const url = getPreviewImageUrl(item);

    return (
      <div key={item['@id']} className="item summary">
        {url && <img src={url} alt=""></img>}
        <div>
          <ItemTitleTag>
            <a href={item['@id']}>{item.title || item.id}</a>
          </ItemTitleTag>
          {item.description && <p>{item.description}</p>}
        </div>
      </div>
    );
  };

  return (
    <>
      {data.headline ? <HeadlineTag>{data.headline}</HeadlineTag> : ''}
      {!data.items || data.items?.length === 0 ? (
        <div>{t('blocks.listing.no-results')}</div>
      ) : (
        data.items.map((item) =>
          data.variation === 'summary'
            ? renderSummary(item)
            : renderDefault(item),
        )
      )}
    </>
  );
};

export default ListingBlockView;
