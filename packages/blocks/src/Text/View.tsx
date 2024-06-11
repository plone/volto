// @ts-nocheck

import type { BlockViewProps } from '@plone/types';
import { renderSlate } from './slate';
import config from '@plone/registry';

const TextBlockView = (props: BlockViewProps) => {
  const { id, data } = props;
  const metadata = props.metadata || props.properties;

  return data?.value ? (
    <>
      {renderSlate(
        id,
        config.settings.slate.elements,
        config.settings.slate.topLevelTargetElements,
        data.value,
        data?.override_toc,
        metadata,
      )}
    </>
  ) : null;
};

export default TextBlockView;
