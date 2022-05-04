import * as slateReducers from './reducers';

import installSlate from './editor';
import installTextBlock from './blocks/Text';
import installTableBlock from './blocks/Table';
import installTitleBlock from './blocks/Title';
import installDescriptionBlock from './blocks/Description';
import RichTextWidget from './widgets/RichTextWidget';
import RichTextWidgetView from './widgets/RichTextWidgetView';
import { BlocksBrowserWidget } from './widgets/BlocksBrowser';
import HashLink from './editor/plugins/Link/AppExtras/HashLink';
import installCallout from './editor/plugins/Callout';
import { installTableButton } from './editor/plugins/Table';
import installSimpleLink from './editor/plugins/SimpleLink';
import HtmlSlateWidget from './widgets/HtmlSlateWidget';
import DefaultSlateView from './components/themes/View/DefaultSlateView';

export default (config) => {
  config = [installSlate, installTextBlock, installTableBlock].reduce(
    (acc, apply) => apply(acc),
    config,
  );

  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: HashLink,
    },
  ];

  config.addonReducers = {
    ...config.addonReducers,
    ...slateReducers,
  };

  config.views = {
    ...config.views,
  };

  config.widgets.widget.blocks_browser = BlocksBrowserWidget;
  config.widgets.widget.slate = RichTextWidget;
  config.widgets.widget.slate_richtext = RichTextWidget; // BBB
  config.widgets.widget.slate_html = HtmlSlateWidget;

  // volto-widgets-view
  if (config.widgets.views?.widget) {
    config.widgets.views.widget.slate = RichTextWidgetView;
    config.widgets.views.widget.slate_richtext = RichTextWidgetView;
  }

  // Default view for custom content-type: 'slate' w/ SlateJSONField: 'slate'
  // Used by cypress
  config.views.contentTypesViews.slate = DefaultSlateView;

  return config;
};

export function minimalDefault(config) {
  config = asDefault(config);
  config.settings.slate.toolbarButtons = [
    'bold',
    'italic',
    'link',
    'separator',
    'heading-two',
    'heading-three',
    'numbered-list',
    'bulleted-list',
    'blockquote',
  ];

  installCallout(config);

  return config;
}

export function simpleLink(config) {
  return installSimpleLink(config);
}

export function tableButton(config) {
  return installTableButton(config);
}

export function asDefaultBlock(config) {
  config.settings.defaultBlockType = 'slate';

  config.blocks.blocksConfig.slateTable.title = 'Table';
  config.blocks.blocksConfig.slate.title = 'Text';

  config.blocks.blocksConfig.text.restricted = true;
  config.blocks.blocksConfig.table.restricted = true;

  config = [installTitleBlock, installDescriptionBlock].reduce(
    (acc, apply) => apply(acc),
    config,
  );

  return config;
}

export function asDefaultRichText(config) {
  config.widgets.widget.richtext = HtmlSlateWidget;
  return config;
}

export function asDefault(config) {
  asDefaultBlock(config);

  asDefaultRichText(config);

  return config;
}

export function asCypressDefault(config) {
  asDefault(config);

  // config.blocks.blocksConfig.title.restricted = false;
  config.blocks.blocksConfig.description.restricted = false;

  return config;
}
