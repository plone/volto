import { serializeNodes } from 'volto-slate/editor/render';
import config from '@plone/volto/registry';

const TextBlockView = (props) => {
  const { id, data, styling = {} } = props;
  const { value, override_toc } = data;
  const metadata = props.metadata || props.properties;
  return serializeNodes(
    value,
    (node, path) => {
      const res = { ...styling };
      if (node.type) {
        if (
          config.settings.slate.topLevelTargetElements.includes(node.type) ||
          override_toc
        ) {
          res.id = id;
        }
      }
      return res;
    },
    { metadata: metadata },
  );
};

export default TextBlockView;
