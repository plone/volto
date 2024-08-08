import {
  serializeNodes,
  serializeNodesToText,
} from '@plone/volto-slate/editor/render';
import config from '@plone/volto/registry';
import { isEqual } from 'lodash';
import Slugger from 'github-slugger';
import { normalizeString } from '@plone/volto/helpers';

const TextBlockView = (props) => {
  const { id, data, styling = {} } = props;
  const { value, override_toc } = data;
  const metadata = props.metadata || props.properties;
  const { topLevelTargetElements } = config.settings.slate;

  const getAttributes = (node, path) => {
    const res = { ...styling };
    if (node.type && isEqual(path, [0])) {
      if (topLevelTargetElements.includes(node.type) || override_toc) {
        const text = serializeNodesToText(node?.children || []);
        const slug = Slugger.slug(normalizeString(text));
        res.id = slug || id;
      }
    }
    return res;
  };

  return serializeNodes(value, getAttributes, { metadata: metadata });
};

export default TextBlockView;
