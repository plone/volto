import React, { useState } from 'react';
import { Menu, Form, List, Grid } from 'semantic-ui-react';
import AlignTile from '../../../helpers/AlignTile';
import { Icon } from '@plone/volto/components';
import fitSVG from '@plone/volto/icons/image-fit.svg';
import leftSVG from '@plone/volto/icons/image-left.svg';
import rightSVG from '@plone/volto/icons/image-right.svg';
import wideSVG from '@plone/volto/icons/image-wide.svg';
import fullSVG from '@plone/volto/icons/image-full.svg';

const LayoutChooser = props => {
  const [activeItem, setActiveItem] = useState('');

  const handleChangeInput = event => {
    setActiveItem(event.target.value);
  };

  return (
    <Form.Field
      inline
      required={props.required}
      className={props.description ? 'help' : ''}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${props.id}`}>{props.title}</label>
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
  );
};

export default LayoutChooser;
