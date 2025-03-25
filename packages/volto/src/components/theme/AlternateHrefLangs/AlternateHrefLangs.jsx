import config from '@plone/volto/registry';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { flattenToAppURL, toPublicURL } from '@plone/volto/helpers/Url/Url';

const AlternateHrefLangs = (props) => {
  const { content } = props;
  return (
    <Helmet>
      {config.settings.isMultilingual &&
        content['@components']?.translations?.items &&
        [
          ...content['@components']?.translations?.items,
          { '@id': content['@id'], language: content.language.token },
        ].map((item, key) => {
          return (
            <link
              key={key}
              rel="alternate"
              hrefLang={item.language}
              href={toPublicURL(flattenToAppURL(item['@id']))}
            />
          );
        })}
    </Helmet>
  );
};

export { AlternateHrefLangs };
