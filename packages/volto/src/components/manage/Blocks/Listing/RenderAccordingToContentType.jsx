import config from '@plone/volto/registry';
import ListPage from '@plone/volto/components/manage/Blocks/Listing/ListPage';
import ListNews from '@plone/volto/components/manage/Blocks/Listing/ListNewsItem';
import ListEvent from '@plone/volto/components/manage/Blocks/Listing/ListEventItem';

const contentTemplate = {
  Document: ListPage,
  'News Item': ListNews,
  Event: ListEvent,
};

const RenderAccordingToContentType = ({
  item,
  TitleTag,
  isEditMode,
  image,
  grid,
}) => {
  const type = item && item['@type'];
  const Template =
    (type &&
      config?.getComponent &&
      config.getComponent({ name: 'ListingTemplate', dependencies: [type] })
        .component) ||
    contentTemplate[type];

  return (
    <>
      {Template ? (
        <Template
          item={item}
          TitleTag={TitleTag}
          isEditMode={isEditMode}
          image={image}
          grid={grid}
        />
      ) : null}
    </>
  );
};

export default RenderAccordingToContentType;
