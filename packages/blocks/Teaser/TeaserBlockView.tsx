import type { BlockViewProps } from '@plone/types';
import { Link } from '@plone/components';
import Image from '@plone/layout/components/Image/Image';

type TeaserViewProps = BlockViewProps & {
  isEditMode?: boolean;
};

const asFirstItem = <T,>(value: T | T[] | undefined): T | undefined =>
  Array.isArray(value) ? value[0] : value;

const TeaserBlockView = (props: TeaserViewProps) => {
  const { data } = props;
  const href = asFirstItem(data.href as any);
  const image = asFirstItem(data.preview_image as any);
  const link =
    typeof href === 'string' ? href : (href as any)?.['@id'] || undefined;
  const title =
    data.title || (href as any)?.title || (href as any)?.Title || '';
  const description =
    data.description ||
    (href as any)?.description ||
    (href as any)?.Description ||
    '';
  const teaserBody = (
    <div className="teaser-item">
      <div className="teaser-image-wrapper">
        <Image
          item={image || href}
          alt={title}
          imageField={
            image ? (image as any).image_field : (href as any)?.image_field
          }
          loading="lazy"
          responsive={true}
        />
      </div>
      <div className="teaser-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div>
      {props.isEditMode || !link ? (
        teaserBody
      ) : (
        <Link href={link}>{teaserBody}</Link>
      )}
    </div>
  );
};

export default TeaserBlockView;
