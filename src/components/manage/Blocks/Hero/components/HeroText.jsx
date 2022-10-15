import React from 'react';
import { LinkMore } from '@plone/volto/components';

import { DetachedTextBlockEditor } from '@plone/volto-slate/blocks/Text/DetachedTextBlockEditor';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

const HeroText = (props) => {
  const { data, isEditMode } = props;

  return (
    <div className="hero-body">
      <div className="hero-text">
        {isEditMode ? (
          <DetachedTextBlockEditor {...props} />
        ) : (
          <TextBlockView {...props} />
        )}
      </div>
      <LinkMore data={data} isEditMode={isEditMode} />
    </div>
  );
};

export default HeroText;
