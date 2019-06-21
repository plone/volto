import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { Icon, TextWidget } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import ObjectBrowser from './ObjectBrowser';

import clearSVG from '@plone/volto/icons/clear.svg';
import folderSVG from '@plone/volto/icons/folder.svg';

const ImageSidebar = props => {
  const [origin, setOrigin] = useState(props.data.url || '');
  const [alt, setAlt] = useState(props.data.alt || '');
  const [browserIsOpen, setBrowserIsOpen] = useState(false);

  function closeBrowser() {
    setBrowserIsOpen(false);
    setOrigin(props.data.url);
  }

  return !browserIsOpen ? (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Image</h2>
        <button onClick={props.closeSidebar}>
          <Icon name={clearSVG} size="24px" color="#786Ec5D" />
        </button>
      </header>

      {props.data.url && (
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
              iconAction={() => setBrowserIsOpen(true)}
            />
            <TextWidget
              id="alt"
              title="alt"
              required={false}
              value={alt}
              onChange={e => setAlt(e.target.value)}
            />
          </Segment>
        </>
      )}
    </Segment.Group>
  ) : (
    <ObjectBrowser {...props} closeBrowser={closeBrowser} />
  );
};

export default ImageSidebar;
