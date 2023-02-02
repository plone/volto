import React from 'react';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import cx from 'classnames';

import clearSVG from '@plone/volto/icons/clear.svg';

const HeroToolbar = ({
  selected,
  editable,
  data,
  isEditMode,
  onChangeBlock,
  block,
  className,
}) => (
  <>
    {selected && editable && !!data.url && isEditMode && (
      <div className={cx('toolbar', className)}>
        <Button.Group>
          <Button
            icon
            basic
            onClick={() =>
              onChangeBlock(block, {
                ...data,
                url: '',
              })
            }
          >
            <Icon name={clearSVG} size="24px" color="#e40166" />
          </Button>
        </Button.Group>
      </div>
    )}
  </>
);

export default HeroToolbar;
