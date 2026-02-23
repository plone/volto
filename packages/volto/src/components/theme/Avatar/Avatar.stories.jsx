import Avatar from './Avatar';

const UserAvatar = (args) => <Avatar {...args} />;

export default {
  title: 'Avatar',

  argTypes: {
    title: {
      control: 'text',
    },
  },
};

export const Avatar3 = {
  render: UserAvatar.bind({}),
  name: 'Avatar',

  args: {
    title: 'Plone',
    color: '#007eb6',
    size: 60,
  },
};
