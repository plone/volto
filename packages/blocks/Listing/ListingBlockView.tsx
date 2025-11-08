import type { BlockViewProps, ListingBlockFormData } from '@plone/types';

/**
 * View listing block component.
 * @class View
 * @extends Component
 */
const ListingBlockView = (props: BlockViewProps) => {
  const data = props.data as ListingBlockFormData;
  const HeadlineTag = data.headlineTag || 'h2';
  const ItemTitleTag = data.headlineTag === 'h2' ? 'h3' : 'h4';

  return (
    <>
      {data.headline ? <HeadlineTag>{data.headline}</HeadlineTag> : ''}
      {!data.items || data.items?.length === 0 ? (
        <div>No results.</div>
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
