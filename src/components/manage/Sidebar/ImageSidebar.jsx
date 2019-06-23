import React, { useState } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { Icon, TextWidget } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Form } from 'semantic-ui-react';
import AlignTile from '../../../helpers/AlignTile';

import clearSVG from '@plone/volto/icons/clear.svg';
import folderSVG from '@plone/volto/icons/folder.svg';

const ImageSidebar = props => {
  const [origin, setOrigin] = useState(props.data.url || '');
  const [alt, setAlt] = useState(props.data.alt || '');
  const [browserIsOpen, setBrowserIsOpen] = useState(false);
  const [layout, setLayout] = useState(props.data.layout || '');

  function closeBrowser() {
    setBrowserIsOpen(false);
    setOrigin(props.data.url);
  }

  return (
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
              alt={alt}
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
              onChange={(name, value) => setAlt(value)}
            />
            <Form.Field
              inline
              required={props.required}
              className={props.description ? 'help' : ''}
            >
              <Grid>
                <Grid.Row>
                  <Grid.Column width="4">
                    <div className="wrapper">
                      <label htmlFor={`field-align`}>align</label>
                    </div>
                  </Grid.Column>
                  <Grid.Column width="8">
                    <AlignTile
                      align={props.data.align}
                      onChangeTile={props.onChangeTile}
                      data={props.data}
                      tile={props.tile}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Field>
          </Segment>
        </>
      )}
    </Segment.Group>
  );
};

ImageSidebar.defaultProps = { required: false };

export default ImageSidebar;
