import React, { useEffect } from 'react';
import { SidebarPortal } from '@plone/volto/components';
import Data from './Data';
import type { BlockEditProps } from '@plone/types';
import { Input, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import aheadSVG from '@plone/volto/icons/ahead.svg';

const InputBlockEdit = (props: BlockEditProps) => {
  const { selected, block, data, onChangeBlock } = props;
  const [url, setUrl] = React.useState(data?.url);

  useEffect(() => {
    setUrl(data?.url);
  }, [data?.url]);

  return (
    <>
      <div>Input Block Edit</div>

      <Input
        onChange={(e) => setUrl(e.target.value)}
        placeholder={
          'Change url to check if the widgets from sidebar are getting updated'
        }
        value={url}
        id="input_block"
      />
      <Button
        basic
        icon
        primary
        id="add_link"
        onClick={(e) => {
          onChangeBlock(block, {
            ...data,
            url: url,
          });
        }}
      >
        <Icon name={aheadSVG} size="24px" />
      </Button>
      <SidebarPortal selected={selected}>
        <Data {...props} />
      </SidebarPortal>
    </>
  );
};

export default InputBlockEdit;
