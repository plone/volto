import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { Icon, TextWidget } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import clearSVG from '@plone/volto/icons/clear.svg';
import folderSVG from '@plone/volto/icons/folder.svg';

const ImageSidebar = props => {
  const [origin, setOrigin] = useState('');
  const [alt, setAlt] = useState('');
  const [browserIsOpen, setBrowserIsOpen] = useState(false);

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Image</h2>
        <button onClick={props.closeSidebar}>
          <Icon name={clearSVG} size="24px" color="#786E5D" />
        </button>
      </header>
      {!browserIsOpen ? (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            {/* {props.data.url && <div>{props.data.url}</div>} */}
            The name of the Image and metadata
            <img
              src={`${flattenToAppURL(props.data.url)}/@@images/image/mini`}
              alt={props.data.alt}
            />
          </Segment>
          <Segment className="form sidebar-image-data">
            <h4>Image</h4>

            <TextWidget
              id="Origin"
              title="Origin"
              required={false}
              value={origin}
              icon={folderSVG}
              iconAction={setBrowserIsOpen}
            />
          </Segment>
        </>
      ) : (
        <div />
      )}
    </Segment.Group>
  );
};

export default ImageSidebar;
