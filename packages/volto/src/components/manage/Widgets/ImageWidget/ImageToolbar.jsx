import React from 'react';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';

const ImageToolbar = ({ className, data, id, onChange, selected }) => (
  <div className="image-upload-widget-toolbar">
    <Button.Group>
      <Button icon basic onClick={() => onChange(id, null)}>
        <Icon className="circled" name={clearSVG} size="24px" color="#e40166" />
      </Button>
    </Button.Group>
  </div>
);

export default ImageToolbar;
