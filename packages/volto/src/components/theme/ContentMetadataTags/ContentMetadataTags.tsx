import { useEffect } from 'react';
import {
  toPublicURL,
  Helmet,
  hasApiExpander,
  getBaseUrl,
} from '@plone/volto/helpers';
import { getNavroot } from '@plone/volto/actions';
import config from '@plone/volto/registry';
import { useDispatch, useSelector } from 'react-redux';
import type {
  Content,
  GetNavrootResponse,
  GetSiteResponse,
  PreviewImage,
} from '@plone/types';
import { match, P } from 'ts-pattern';

interface FormState {
  router: {
    location: {
      pathname: string;
    };
  };
  navroot: { data: GetNavrootResponse };
  site: {
    data: GetSiteResponse;
  };
}

// Extend this in your add-on if your content type has different image field
export interface PossibleImageFields {
  image?:
    | PreviewImage
    | {
        image: PreviewImage;
      };
  preview_image?: PreviewImage;
  preview_image_link?: Content & { image: PreviewImage };
}
type PossibleImageFieldsKeys = keyof PossibleImageFields;
type PossibleImageFieldsUnion = PossibleImageFields[PossibleImageFieldsKeys];

type SEOProps = {
  opengraph_title: string;
  opengraph_description: string;
  seo_title: string;
  seo_description: string;
  seo_canonical_url: string;
  seo_noindex: boolean;
  opengraph_image: PreviewImage;
};

type ContentMetadataTagsProps = {
  content: Content & SEOProps & PossibleImageFields;
};

const ContentMetadataTags = (props: ContentMetadataTagsProps) => {
  const {
    opengraph_title,
    opengraph_description,
    seo_title,
    seo_description,
    seo_canonical_url,
    seo_noindex,
    title,
    description,
  } = props.content;

  const dispatch = useDispatch();
  const pathname = useSelector<FormState, string>(
    (state) => state.router.location.pathname,
  );
  const navroot = useSelector<FormState, GetNavrootResponse['navroot']>(
    (state) => state.navroot?.data?.navroot,
  );
  const site = useSelector<FormState, GetSiteResponse>(
    (state) => state.site?.data,
  );

  useEffect(() => {
    if (pathname && !hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  const contentMetadataTagsImageField = config.settings
    .contentMetadataTagsImageField as keyof PossibleImageFields;
  const image = props.content[contentMetadataTagsImageField];
  const { opengraph_image } = props.content;

  const getContentImageInfo = (image: PossibleImageFieldsUnion) =>
    match(image)
      .with({ scales: { large: { download: P.string } } }, ({ scales }) => ({
        contentHasImage: true,
        url: scales.large.download,
        height: scales.large.height,
        width: scales.large.width,
      }))
      .with(
        { image: { scales: { large: { download: P.string } } } },
        ({ image }) => ({
          contentHasImage: true,
          url: image.scales.large.download,
          height: image.scales.large.height,
          width: image.scales.large.width,
        }),
      )
      .otherwise(() => ({
        contentHasImage: false,
        url: undefined,
        height: undefined,
        width: undefined,
      }));

  const contentImageInfo = getContentImageInfo(opengraph_image || image);

  const getTitle = () => {
    const includeSiteTitle =
      config?.settings?.siteTitleFormat?.includeSiteTitle || false;
    const titleAndSiteTitleSeparator =
      config?.settings?.titleAndSiteTitleSeparator || '-';
    const navRootTitle = navroot?.title;
    const siteRootTitle = site?.['plone.site_title'];
    const titlePart = navRootTitle || siteRootTitle;

    if (includeSiteTitle && titlePart && titlePart !== title) {
      return seo_title || `${title} ${titleAndSiteTitleSeparator} ${titlePart}`;
    } else {
      return seo_title || title;
    }
  };

  return (
    <>
      <Helmet>
        <title>{getTitle()?.replace(/\u00AD/g, '')}</title>
        <link
          rel="canonical"
          href={seo_canonical_url || toPublicURL(props.content['@id'])}
        />
        <meta name="description" content={seo_description || description} />
        <meta
          property="og:title"
          content={opengraph_title || seo_title || title}
        />
        <meta
          property="og:url"
          content={seo_canonical_url || toPublicURL(props.content['@id'])}
        />
        {seo_noindex && <meta name="robots" content="noindex" />}
        {contentImageInfo.contentHasImage && (
          <meta
            property="og:image"
            content={toPublicURL(contentImageInfo.url)}
          />
        )}
        {contentImageInfo.contentHasImage && (
          <meta
            property="og:image:width"
            content={contentImageInfo.width?.toString()}
          />
        )}
        {contentImageInfo.contentHasImage && (
          <meta
            property="og:image:height"
            content={contentImageInfo.height?.toString()}
          />
        )}
        {(opengraph_description || seo_description || description) && (
          <meta
            property="og:description"
            content={opengraph_description || seo_description || description}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    </>
  );
};

export default ContentMetadataTags;
