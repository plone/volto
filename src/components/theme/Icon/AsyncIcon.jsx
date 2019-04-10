import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@plone/volto/components';

const defaultSize = '36px';

/**
 * AsyncIcon container class.
 * @class ObjectBrowser
 * @extends Component
 */
class AsyncIcon extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    size: defaultSize,
    color: null,
    className: null,
    title: null,
    onClick: null,
  };

  state = {
    component: null,
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    import(`@plone/volto/icons/${this.props.name}.svg`).then(cmp => {
      this.setState({ component: cmp.default });
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const C = this.state.component;
    return C ? <Icon {...this.props} name={C} /> : null;
  }
}

export default AsyncIcon;
