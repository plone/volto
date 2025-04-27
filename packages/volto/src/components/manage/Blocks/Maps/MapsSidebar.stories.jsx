import { injectIntl } from 'react-intl';
import MapsSidebarComponent from './MapsSidebar';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlMapsSidebarComponent = injectIntl(MapsSidebarComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlMapsSidebarComponent
        data={{ ...args }}
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
        resetSubmitUrl={() => {}}
      />
    </Wrapper>
  );
}

export const MapsSidebar = StoryComponent.bind({});
MapsSidebar.args = {
  title: 'New Delhi Map',
  url: 'https://www.google.com/maps/d/u/0/viewer?mid=1IEVwjHNKZcYI5LKHZfRSFXEKyzg&hl=en_US&ll=28.536795394594428%2C77.15845149999998&z=11',
};

export default {
  title: 'Internal Components/Maps/MapsSidebar',
  component: MapsSidebar,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
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
      description: 'Url of the Map',
    },
  },
};
