import SlotRenderer, { type SlotComponentProps } from '../SlotRenderer';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';

const HeaderTools = (props: SlotComponentProps) => {
  const rootData = useRouteLoaderData<RootLoader>('root');

  if (!rootData) {
    return null;
  }

  const { isAuthenticated } = rootData;
  const { content, location } = props;

  return (
    <>
      {isAuthenticated ? (
        <SlotRenderer
          name="siteActions"
          content={content}
          location={location}
        />
      ) : (
        <SlotRenderer name="anontools" content={content} location={location} />
      )}
      <SlotRenderer
        name="languageSwitcher"
        content={content}
        location={location}
      />
      <SlotRenderer name="searchWidget" content={content} location={location} />
    </>
  );
};

export default HeaderTools;
