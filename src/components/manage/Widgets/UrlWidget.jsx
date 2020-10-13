/**
 * UrlWidget component.
 * @module components/manage/Widgets/UrlWidget
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { addAppURL } from '@plone/volto/helpers';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

/** UrlWidget function component
 * @function UrlWidget
 * @returns {string} Markup of the component
 */
const UrlWidget = (props) => {
  const { id, value, onChange, onBlur, onClick, minLength, maxLength } = props;
  const inputId = `field-${id}`;

  /**
   * Clear handler
   * @method clear
   * @param {Object} value Value
   * @returns {undefined}
   */
  const clear = () => {
    onChange(id, undefined);
  };

  return (
    <FormFieldWrapper {...props} className="url wide">
      <div className="wrapper">
        <Input
          id={inputId}
          name={id}
          type="url"
          value={value || ''}
          onChange={({ target }) =>
            onChange(id, target.value === '' ? undefined : target.value)
          }
          onBlur={({ target }) =>
            onBlur(id, target.value === '' ? undefined : target.value)
          }
          onClick={() => onClick()}
          minLength={minLength || null}
          maxLength={maxLength || null}
        />
        {value?.length > 0 ? (
          <Button.Group>
            <Button
              basic
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                clear();
              }}
            >
              <Icon name={clearSVG} size="30px" />
            </Button>
          </Button.Group>
        ) : (
          <Button.Group>
            <Button
              basic
              icon
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.openObjectBrowser({
                  mode: 'link',
                  overlay: true,
                  onSelectItem: (url) => {
                    onChange(id, addAppURL(url));
                  },
                });
              }}
            >
              <Icon name={navTreeSVG} size="24px" />
            </Button>
          </Button.Group>
        )}
      </div>
    </FormFieldWrapper>
  );
};

/**
 * Property types
 * @property {Object} propTypes Property types.
 * @static
 */
UrlWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  openObjectBrowser: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
UrlWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  minLength: null,
  maxLength: null,
};

export default compose(withObjectBrowser)(UrlWidget);
