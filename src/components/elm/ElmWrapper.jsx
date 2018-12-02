import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

const globalState = __SERVER__ ? global : window;

if (!("elmapps" in globalState)) {
    globalState.elmapps = [];
}

class ElmWrapper extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    const app = this.props.src.init({
      node: this.node,
      flags: this.props.flags,
    });

    globalState.elmapps.push(app);
  }

   shouldComponentUpdate() {
    return false;
  }

  storeNode(node) {
    this.node = node;
  }

  render() {
    return <span ref={this.storeNode} />;
  }
}

ElmWrapper.propTypes = {
  flags: PropTypes.objectOf(PropTypes.any),
  src: PropTypes.objectOf(PropTypes.any).isRequired
};

ElmWrapper.defaultProps = {
  flags: null,
  ports: null,
};

export default ElmWrapper;
