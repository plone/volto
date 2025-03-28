import { injectIntl } from 'react-intl';
import ContentsDeleteModalComponent from './ContentsDeleteModal';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlContentsDeleteModal = injectIntl(ContentsDeleteModalComponent);

function StoryComponent(args) {
  const { locale = 'en' } = args; // Default to 'en' if locale is not provided
  const messages =
    {
      [locale]: require(`@plone/volto/../locales/${locale}.json`),
    }[locale] || {};

  return (
    <Wrapper
      customStore={{
        linkIntegrity: {
          result: args.linkIntegrityResult,
          loading: args.loading,
        },
        intl: {
          locale,
          messages,
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <div>{locale}</div>
      <IntlContentsDeleteModal {...args} />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  locale: 'en',
  open: true,
  items: [
    { '@id': '/news', UID: '123', title: 'News' },
    { '@id': '/blog', UID: '456', title: 'Blog' },
    { '@id': '/extra', UID: '789', title: 'Extra' },
  ],
  itemsToDelete: [{ UID: '456' }],
  linkIntegrityResult: [
    {
      '@id': '/blog',
      title: 'Blog',
      items_total: 2,
      breaches: [{ uid: '123', title: 'News', '@id': '/news' }],
    },
  ],
  loading: false,
  onOk: () => {},
  onCancel: () => {},
};

export const DeleteMoreThanOne = StoryComponent.bind({});
DeleteMoreThanOne.args = {
  ...Default.args,
  itemsToDelete: [{ UID: '456' }, { UID: '789' }],
};

export const NoContainedItems = StoryComponent.bind({});
NoContainedItems.args = {
  ...Default.args,
  linkIntegrityResult: [
    {
      '@id': '/blog',
      title: 'Blog',
      items_total: 0,
      breaches: [{ uid: '123', title: 'News', '@id': '/news' }],
    },
  ],
};

export const MultipleLinkIntegrityResults = StoryComponent.bind({});
MultipleLinkIntegrityResults.args = {
  ...Default.args,
  itemsToDelete: [{ UID: '456' }, { UID: '789' }],
  linkIntegrityResult: [
    {
      '@id': '/blog',
      title: 'Blog',
      items_total: 1,
      breaches: [{ uid: '123', title: 'News', '@id': '/news' }],
    },
    {
      '@id': '/extra',
      title: 'Extra',
      items_total: 0,
      breaches: [{ uid: '123', title: 'News', '@id': '/news' }],
    },
  ],
};

export const MultipleBreaches = StoryComponent.bind({});
MultipleBreaches.args = {
  ...Default.args,
  itemsToDelete: [{ UID: '789' }],
  linkIntegrityResult: [
    {
      '@id': '/extra',
      title: 'Extra',
      items_total: 0,
      breaches: [
        { uid: '123', title: 'News', '@id': '/news' },
        { uid: '456', title: 'Blog', '@id': '/blog' },
      ],
    },
  ],
};

export const WithoutLinkIntegrityBreaches = StoryComponent.bind({});
WithoutLinkIntegrityBreaches.args = {
  ...Default.args,
  linkIntegrityResult: [],
};

export default {
  title: 'Public components/Contents/Contents Delete Modal',
  component: Default,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    locale: {
      options: ['en', 'fr', 'de', 'it', 'eu'],
      control: {
        type: 'radio',
      },
    },
  },
};
