import type { BlockViewProps } from '@plone/types';
import { Link } from '@plone/components';

const TeaserBlockView = (props: BlockViewProps) => {
  const { data } = props;
  const href = Array.isArray(data.href) ? data.href?.[0]?.['@id'] : data.href;
  const image = data.preview_image?.[0];
  // TODO: Improve the images download path including the ++api++ to avoid having to setup a redirect
  // for @@images and @@download
  const url =
    data.preview_image?.[0]?.['@id'] ||
    `/++api++${data.href[0]?.image_scales[data.href[0].image_field][0].base_path}/${data.href[0]?.image_scales[data.href[0].image_field][0].scales.larger.download}`;

  return (
    <div>
      <Link href={href}>
        <div className="teaser-item">
          <div className="teaser-image-wrapper">
            <img src={url} alt="" />
          </div>
          <div className="teaser-content">
            <h2>{data.title}</h2>
            <p>{data?.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeaserBlockView;
