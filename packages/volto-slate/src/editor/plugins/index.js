import installBlockQuotePlugin from './Blockquote';
import installCallout from './Callout';
import installImage from './Image';
import installLinkPlugin from './Link';
import installMarkdown from './Markdown';
import installTable from './Table';
import installStyleMenu from './StyleMenu';

export default function install(config) {
  return [
    installBlockQuotePlugin,
    installCallout,
    installLinkPlugin,
    installMarkdown,
    installImage,
    installTable,
    installStyleMenu,
  ].reduce((acc, apply) => apply(acc), config);
}
