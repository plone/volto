import config from '@plone/volto/registry';
const RenderAccordingToContentType = ({
  item,
  TitleTag,
  isEditMode,
  image,
  grid,
}) => {
  const type = item && item['@type'];
  const Template =
    type &&
    config.getComponent({
      name: `${type}ListingTemplate`,
    }).component;

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
