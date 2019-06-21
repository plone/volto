import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from '../../../components';
import backSVG from '../../../icons/back.svg';

const StandardWrapper = props => {
  function pull() {
    props.unloadComponent();
  }

  return (
    <div
      className={cx(`${props.componentName} pastanaga-menu`, {
        'has-inner-actions': props.hasActions,
      })}
    >
      <header className="header pulled">
        <button onClick={pull}>
          <Icon name={backSVG} size="32px" />
        </button>
        <div className="vertical divider" />
        <h2>{props.componentName}</h2>
      </header>
      {props.children}
    </div>
  );
};

StandardWrapper.propTypes = {
  componentName: PropTypes.string.isRequired,
  unloadComponent: PropTypes.func.isRequired,
  loadComponent: PropTypes.string.isRequired,
  closeMenu: PropTypes.string.isRequired,
  hasActions: PropTypes.bool,
};

export default StandardWrapper;
