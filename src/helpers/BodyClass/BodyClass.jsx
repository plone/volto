import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import withSideEffect from 'react-side-effect';

/**
 * @export
 * @class BodyClass
 * @extends {Component}
 */
class BodyClass extends Component {
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.children) {
      return Children.only(this.props.children);
    }
    return null;
  }
}

BodyClass.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

BodyClass.defaultProps = {
  children: null,
  className: null,
};

/**
 * reducePropsToState
 * @function reducePropsToState
 * @param {*} propsList propsList
 * @returns {List} classList
 */
function reducePropsToState(propsList) {
  let classList = [];
  propsList.map(props => {
    if (props.className) {
      classList = classList.concat(props.className);
    }
  });
  return classList;
}

/**
 * handleStateChangeOnClient
 * @function handleStateChangeOnClient
 * @param {*} classList classList
 * @returns {null} null
 */
function handleStateChangeOnClient(classList) {
  document.body.className = '';
  classList.map(className => {
    if (!document.body.classList.contains(className)) {
      document.body.classList.add(className);
    }
  });
}

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(
  BodyClass,
);
