import MapsSidebarComponent from './MapsSidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
import BlockWrapper from '@plone/volto/stories/BlockWrapper';

function StoryComponent(args) {
  return (
    <Wrapper>
      <BlockWrapper data={{ ...args }}>
        <MapsSidebarComponent data={{ ...args }} />
      </BlockWrapper>
    </Wrapper>
  );
}

export const MapsSidebar = StoryComponent.bind({});
MapsSidebar.args = {
  title: 'New Delhi Map',
  url: 'https://www.google.com/maps/d/u/0/viewer?mid=1IEVwjHNKZcYI5LKHZfRSFXEKyzg&hl=en_US&ll=28.536795394594428%2C77.15845149999998&z=11',
};

export default {
  title: 'Blocks/Maps/MapsSidebar',
  component: MapsSidebar,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Alternative text of the map block',
    },
    url: {
      control: 'text',
      description: 'URL of the map block',
    },
  },
};
