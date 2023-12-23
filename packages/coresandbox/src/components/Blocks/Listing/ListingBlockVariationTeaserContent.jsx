import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';

const ListingBlockVariationTeaserContent = ({ items }) => {
  return (
    <div>
      <h3>listing block variation "ListingBlockVariationTeaserContent"</h3>
      {items.map((item, index) => (
        <div className="listing-body" key={index}>
          <RenderBlocks content={item} />
        </div>
      ))}
    </div>
  );
};

export default ListingBlockVariationTeaserContent;
