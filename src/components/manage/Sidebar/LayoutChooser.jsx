import React, { useState } from 'react';
import { Menu, Form, List, Grid } from 'semantic-ui-react';
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
            <Menu secondary>
              <Menu.Item
                name="layout-fit"
                active={activeItem === 'layout-fit'}
                onClick={handleChangeInput}
              >
                <Icon name={fitSVG} size="24px" color="#786Ec5D" />
              </Menu.Item>
              <Menu.Item
                name="layout-left"
                active={activeItem === 'layout-left'}
                onClick={handleChangeInput}
              >
                <Icon name={leftSVG} size="24px" color="#786Ec5D" />
              </Menu.Item>
              <Menu.Item
                name="layout-right"
                active={activeItem === 'layout-right'}
                onClick={handleChangeInput}
              >
                <Icon name={rightSVG} size="24px" color="#786Ec5D" />
              </Menu.Item>
              <Menu.Item
                name="layout-full"
                active={activeItem === 'layout-full'}
                onClick={handleChangeInput}
              >
                <Icon name={fullSVG} size="24px" color="#786Ec5D" />
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  );
};

export default LayoutChooser;
