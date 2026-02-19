import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import { Button } from 'semantic-ui-react';
import { setToggleBlocksPreview } from '@plone/volto/actions';

import rowSVG from '@plone/volto/icons/row.svg';
import heroSVG from '@plone/volto/icons/hero.svg';

const messages = defineMessages({
  showBlocks: {
    id: 'Show blocks from page preview',
    defaultMessage: 'Show blocks from page preview',
  },
  hideBlocks: {
    id: 'Hide blocks from page preview',
    defaultMessage: 'Hide blocks from page preview',
  },
});

const ShowHideBlocksToolbar = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [checkHiddenBlocks, setCheckHiddenBlocks] = useState([]);

  const toggleBlocksPreviewState = useSelector(
    (state) => state?.toggleBlocksPreview,
  );

  useEffect(() => {
    if (props.formData?.blocks) {
      const hiddenBlocks = Object.values(props.formData.blocks).filter(
        (block) => block.hidden === true,
      );
      if (hiddenBlocks.length === 0) {
        dispatch(setToggleBlocksPreview(false));
      }
      setCheckHiddenBlocks(hiddenBlocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.formData]);

  return (
    <>
      <Plug
        pluggable="main.toolbar.bottom"
        id="blocks-hide-btn"
        dependencies={[toggleBlocksPreviewState, checkHiddenBlocks]}
      >
        <Button
          aria-label={
            !toggleBlocksPreviewState
              ? intl.formatMessage(messages.hideBlocks)
              : intl.formatMessage(messages.showBlocks)
          }
          onClick={() => {
            dispatch(setToggleBlocksPreview(!toggleBlocksPreviewState));
          }}
          tabIndex={0}
          className="hideBlocks"
          disabled={checkHiddenBlocks.length === 0}
        >
          {!toggleBlocksPreviewState ? (
            <Icon name={rowSVG} size="30px" className="circled" />
          ) : (
            <Icon name={heroSVG} size="30px" className="circled" />
          )}
        </Button>
      </Plug>
    </>
  );
};

export default ShowHideBlocksToolbar;
