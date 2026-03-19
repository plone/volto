import type {
  BlockViewProps,
  Brain,
  BlocksFormData,
  QuerystringParameter,
} from '@plone/types';
import { useTranslation } from 'react-i18next';

type SearchBlockData = BlocksFormData & {
  headline?: string;
  headlineTag?: 'h2' | 'h3';
  items?: Brain[];
  query?: QuerystringParameter['query'];
  querystring?: QuerystringParameter;
  showTotalResults?: boolean;
  listingBodyTemplate?: string;
};

const getPreviewImageUrl = (item: Brain) => {
  const imageField = item.image_field;
  const imageScales = item.image_scales?.[imageField]?.[0];
  if (!imageField || !imageScales) {
    return;
  }
  return `${imageScales.base_path || item['@id'] || ''}/${imageScales.scales.thumb?.download}`;
};

const getSearchableText = (data: SearchBlockData) => {
  const query = data.query ?? data.querystring?.query ?? [];
  const searchableTextCriterion = query.find(
    (item) => item.i === 'SearchableText',
  );

  return typeof searchableTextCriterion?.v === 'string'
    ? searchableTextCriterion.v
    : undefined;
};

const SearchBlockView = (props: BlockViewProps) => {
  const data = props.data as SearchBlockData;
  const HeadlineTag = data.headlineTag || 'h2';
  const ItemTitleTag = data.headlineTag === 'h2' ? 'h3' : 'h4';
  const { t } = useTranslation();
  const results = data.items ?? [];
  const variation = data.listingBodyTemplate || data.variation;
  const searchableText = getSearchableText(data);

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
    <div className={`block search ${variation || 'default'}`}>
      {data.headline ? <HeadlineTag>{data.headline}</HeadlineTag> : null}
      {searchableText ? (
        <p>
          {t('publicui.search.title')} "<q>{searchableText}</q>"
        </p>
      ) : null}
      {data.showTotalResults !== false ? (
        <p>
          {results.length > 0
            ? `${results.length} ${t('publicui.search.results')}`
            : t('publicui.search.noResults')}
        </p>
      ) : null}
      {!results.length ? null : results.map((item) =>
          variation === 'summary' ? renderSummary(item) : renderDefault(item),
        )}
    </div>
  );
};

export default SearchBlockView;
