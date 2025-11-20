import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { flattenToAppURL, toPublicURL } from '@plone/volto/helpers/Url/Url';
import { getLanguageToken } from '@plone/volto/helpers/Content/Content';

const AlternateHrefLangs = (props) => {
  const { content } = props;
  const languageToken = getLanguageToken(content?.language);

  return (
    <Helmet>
      {content['@components']?.translations?.items &&
        languageToken &&
        [
          ...content['@components']?.translations?.items,
          { '@id': content['@id'], language: languageToken },
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
