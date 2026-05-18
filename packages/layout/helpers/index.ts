import { matchPath } from 'react-router';
import { getStyleFieldsFromBlockSchema } from '@plone/helpers';
import type { BlocksConfigData, BlocksFormData, Content } from '@plone/types';
import type { Location, PathPattern } from 'react-router';

type StyleFieldConfig = {
  defaultValue?: string;
  values?: readonly string[];
  path?: string;
};

export function RouteCondition(path: string | PathPattern) {
  return ({ location }: { location: Location }) =>
    Boolean(matchPath(path, location.pathname));
}

export function ContentTypeCondition(contentType: string[]) {
  return ({ content, location }: { content: Content; location: Location }) => {
    return (
      contentType.includes(content?.['@type']) ||
      contentType.some((type) => {
        return location.search.includes(`type=${encodeURIComponent(type)}`);
      })
    );
  };
}

export function NotContentTypeCondition(contentType: string[]) {
  return ({ content, location }: { content: Content; location: Location }) => {
    return (
      !contentType.includes(content?.['@type']) &&
      !contentType.some((type) => {
        return location.search.includes(`type=${encodeURIComponent(type)}`);
      })
    );
  };
}

export function shouldShowToolbar(content?: Content | null) {
  const actions = content?.['@components']?.actions;
  const isVisible =
    (actions?.object?.some((a) => a.id === 'edit') ?? false) ||
    (actions?.object_buttons?.some((a) => a.id === 'edit') ?? false);

  return isVisible;
}

export const getBlockStyleFieldConfigs = (
  data: BlocksFormData,
  blocksConfig?: BlocksConfigData,
) => {
  const blockType = data['@type'];

  if (!blockType) return {};

  const blockConfig = blocksConfig?.[blockType];
  const styleFields = getStyleFieldsFromBlockSchema(blockConfig, data);

  // Keep `blockWidth` as a fallback for Plone blocks that wants to configure it
  // in blocksConfig instead using a explicit width schema field marked with `styleField: true`.
  if (blockConfig?.blockWidth) {
    styleFields.blockWidth = {
      defaultValue: blockConfig.blockWidth.defaultWidth,
      values: blockConfig.blockWidth.widths,
    };
  }

  return styleFields as Record<string, StyleFieldConfig>;
};
