import type { BlockViewProps } from '@plone/types';
import { Link } from '@plone/components';
import Image from '@plone/layout/components/Image/Image';

const TeaserBlockView = (props: BlockViewProps) => {
  const { data } = props;
  const href = Array.isArray(data.href) ? data.href[0] : data.href;
  const image = Array.isArray(data.preview_image)
    ? data.preview_image[0]
    : data.preview_image;
  const link = Array.isArray(data.href) ? data.href?.[0]?.['@id'] : data.href;

  return (
    <div>
      <Link href={link}>
        <div className="teaser-item">
          <div className="teaser-image-wrapper">
            <Image
              item={image || href}
              alt={data.title || ''}
              imageField={image ? image.image_field : href?.image_field}
              loading="lazy"
              responsive={true}
            />
          </div>
          <div className="teaser-content">
            <h2>{data.title || ''}</h2>
            <p>{data?.description || ''}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeaserBlockView;
