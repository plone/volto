import { Container } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
const AnnounceView = (props) => {
  const { data } = props;

  return (
    <div className="block release full-width">
      <Container>
        <h2>{data.title}</h2>
        <div className="text-button-wrapper">
          <p>{data.description}</p>
          {data.buttonLink && (
            <UniversalLink
              className="button-link"
              href={data.buttonLink[0]['@id']}
              openInNewTab
            >
              {data.buttonTitle}
            </UniversalLink>
          )}
        </div>

        {data.image && Array.isArray(data.image) && data.image.length > 0 && (
          <img
            src={`${data.image[0]['@id']}/@@images/image`}
            alt={data.imageAlt}
          />
        )}
      </Container>
    </div>
  );
};

export default AnnounceView;
