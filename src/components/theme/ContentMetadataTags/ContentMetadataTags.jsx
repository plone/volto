import { useEffect } from 'react';
import React from 'react';
import { toPublicURL, Helmet } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { useSelector, useDispatch } from 'react-redux';
import { getNavroot } from '@plone/volto/actions';

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
  const pathname = useSelector((state) => state.router.location.pathname);
  const navroot = useSelector((state) => state.navroot.data);
  const dispatch = useDispatch();

  useEffect(() => {
    pathname && dispatch(getNavroot(pathname));
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

  let title_tag_content = seo_title || title;
  let nav_root_title = navroot?.navroot?.title;
  title_tag_content =
    (nav_root_title === title_tag_content && title_tag_content) ||
    title_tag_content + ' — ' + nav_root_title;
  title_tag_content = title_tag_content.replace(/\u00AD/g, '');
  return (
    <>
      <Helmet>
        <title>{title_tag_content}</title>
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
