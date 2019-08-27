import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Grid, Segment } from 'semantic-ui-react';
import { Icon, TextWidget } from '@plone/volto/components';
import { AlignTile, flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

import folderSVG from '@plone/volto/icons/folder.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const ImageSidebar = ({
  data,
  tile,
  onChangeTile,
  openObjectBrowser,
  required = false,
}) => {
  const [alt, setAlt] = useState(data.alt || '');

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Image</h2>
      </header>

      {!data.url && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            No image selected
            <Icon name={imageSVG} size="100px" color="#b8c6c8" />
          </Segment>
        </>
      )}
      {data.url && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            {/* {props.data.url && <div>{props.data.url}</div>} */}
            {data.url.split('/').slice(-1)[0]}
            {data.url.includes(settings.apiPath) && (
              <img
                src={`${flattenToAppURL(data.url)}/@@images/image/mini`}
                alt={alt}
              />
            )}
            {!data.url.includes(settings.apiPath) && (
              <img src={data.url} alt={alt} style={{ width: '50%' }} />
            )}
          </Segment>
          <Segment className="form sidebar-image-data">
            {data.url.includes(settings.apiPath) && (
              <TextWidget
                id="Origin"
                title="Origin"
                required={false}
                value={data.url.split('/').slice(-1)[0]}
                icon={folderSVG}
                iconAction={() => openObjectBrowser()}
                onChange={() => {}}
              />
            )}
            {!data.url.includes(settings.apiPath) && (
              <TextWidget
                id="External"
                title="External URL"
                required={false}
                value={data.url}
                icon={clearSVG}
                iconAction={() =>
                  onChangeTile(tile, {
                    ...data,
                    url: '',
                  })
                }
                onChange={() => {}}
              />
            )}
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
