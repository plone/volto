import TitleComponent from './Title';

const Title = (args) => <TitleComponent {...args} />;

export default {
  title: 'Title',

  argTypes: {
    title: {
      control: 'text',
    },
  },
};

export const Title_ = {
  render: Title.bind({}),
  name: 'Title',

  args: {
    title: 'Welcome to Plone',
  },
};
