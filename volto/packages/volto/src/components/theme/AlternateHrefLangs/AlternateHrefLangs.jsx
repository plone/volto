import config from '@plone/volto/registry';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';

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
              href={item['@id']}
            />
          );
        })}
    </Helmet>
  );
};

export { AlternateHrefLangs };
