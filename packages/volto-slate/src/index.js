import * as slateReducers from './reducers';

import installSlate from './editor';
import installTextBlock from './blocks/Text';
import installTableBlock from './blocks/Table';
import RichTextWidget from './widgets/RichTextWidget';
import RichTextWidgetView from './widgets/RichTextWidgetView';
import HtmlSlateWidget from './widgets/HtmlSlateWidget';
import ObjectByTypeWidget from './widgets/ObjectByTypeWidget';

export default (config) => {
  config = [installSlate, installTextBlock, installTableBlock].reduce(
    (acc, apply) => apply(acc),
    config,
  );

  config.settings.defaultBlockType = 'slate';

  config.settings.slate.toolbarButtons = [
    'bold',
    'italic',
    'strikethrough',
    'link',
    'separator',
    'heading-two',
    'heading-three',
    'separator',
    'sub',
    'sup',
    'separator',
    'numbered-list',
    'bulleted-list',
    'blockquote',
    'styleMenu',
  ];

  config.settings.slate.scrollIntoView = false;

  config.addonReducers = {
    ...config.addonReducers,
    ...slateReducers,
  };

  config.views = {
    ...config.views,
  };

  config.widgets.widget.slate = RichTextWidget;
  config.widgets.widget.slate_richtext = RichTextWidget;
  config.widgets.widget.slate_html = HtmlSlateWidget;
  config.widgets.widget.richtext = HtmlSlateWidget;
  config.widgets.widget.object_by_type = ObjectByTypeWidget;

  // volto-widgets-view
  if (config.widgets.views?.widget) {
    config.widgets.views.widget.slate = RichTextWidgetView;
    config.widgets.views.widget.slate_richtext = RichTextWidgetView;
  }

  return config;
};
