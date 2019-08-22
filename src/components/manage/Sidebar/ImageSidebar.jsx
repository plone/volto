import React, { useState } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { Icon, TextWidget } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Form } from 'semantic-ui-react';
import { AlignTile } from '@plone/volto/helpers';
import PropTypes from 'prop-types';
import withObjectBrowser from './ObjectBrowser';
import clearSVG from '@plone/volto/icons/clear.svg';
import folderSVG from '@plone/volto/icons/folder.svg';

const ImageSidebar = ({
  data,
  tile,
  onChangeTile,
  openObjectBrowser,
  required = false,
}) => {
  const [origin, setOrigin] = useState(data.url || '');
  const [alt, setAlt] = useState(data.alt || '');
  const [browserIsOpen, setBrowserIsOpen] = useState(false);

  function closeBrowser() {
    setBrowserIsOpen(false);
    setOrigin(data.url);
  }

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Image</h2>
      </header>

      {data.url && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            {/* {props.data.url && <div>{props.data.url}</div>} */}
            {origin.split('/').slice(-1)[0]}
            <img
              src={`${flattenToAppURL(data.url)}/@@images/image/mini`}
              alt={alt}
            />
          </Segment>
          <Segment className="form sidebar-image-data">
            <TextWidget
              id="Origin"
              title="Origin"
              required={false}
              value={origin.split('/').slice(-1)[0]}
              icon={folderSVG}
              iconAction={() => openObjectBrowser()}
            />
            <TextWidget
              id="alt"
              title="alt"
              required={false}
              value={alt}
              onChange={(name, value) => {
                onChangeTile(tile, {
                  ...data,
                  alt: value,
                });
                setAlt(value);
              }}
            />
            <Form.Field inline required={required}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="4">
                    <div className="wrapper">
                      <label htmlFor="field-align">align</label>
                    </div>
                  </Grid.Column>
                  <Grid.Column width="8" className="align-tools">
                    <AlignTile
                      align={data.align}
                      onChangeTile={onChangeTile}
                      data={data}
                      tile={tile}
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

ImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func.isRequired,
};

export default ImageSidebar;
