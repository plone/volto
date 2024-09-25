import React, { useEffect } from 'react';
import { toPublicURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { Helmet } from '@plone/volto/helpers/Helmet/Helmet';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import { getNavroot } from '@plone/volto/actions/navroot/navroot';
import config from '@plone/volto/registry';
import { useDispatch, useSelector } from 'react-redux';

const ContentMetadataTags = (props) => {
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
  const pathname = useSelector((state) => state.router.location.pathname);
  const navroot = useSelector((state) => state.navroot?.data?.navroot);
  const site = useSelector((state) => state.site?.data);

  useEffect(() => {
    if (pathname && !hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  const getContentImageInfo = () => {
    const { contentMetadataTagsImageField } = config.settings;
    const image = props.content[contentMetadataTagsImageField];
    const { opengraph_image } = props.content;

    const contentImageInfo = {
      contentHasImage: false,
      url: null,
      height: null,
      width: null,
    };
    contentImageInfo.contentHasImage =
      opengraph_image?.scales?.large?.download ||
      image?.scales?.large?.download ||
      false;

    if (contentImageInfo.contentHasImage && opengraph_image?.scales?.large) {
      contentImageInfo.url = opengraph_image.scales.large.download;
      contentImageInfo.height = opengraph_image.scales.large.height;
      contentImageInfo.width = opengraph_image.scales.large.width;
    } else if (contentImageInfo.contentHasImage) {
      contentImageInfo.url = image.scales.large.download;
      contentImageInfo.height = image.scales.large.height;
      contentImageInfo.width = image.scales.large.width;
    }

    return contentImageInfo;
  };

  const contentImageInfo = getContentImageInfo();

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
          <meta property="og:image:width" content={contentImageInfo.width} />
        )}
        {contentImageInfo.contentHasImage && (
          <meta property="og:image:height" content={contentImageInfo.height} />
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
