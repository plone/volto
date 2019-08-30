import React from 'react';
import PropTypes from 'prop-types';
import { tiles } from '~/config';

/**
 * TileRenderer container class.
 * @class Form
 * @extends Component
 */
function TileRenderer(props) {
  const EditTile = tiles.defaultTilesEditMap[props.type];
  const ViewTile = tiles.defaultTilesViewMap[props.type];

  if (!props.edit) {
    return <ViewTile {...props} detached onChangeTile={() => {}} />;
  }
  if (props.edit) {
    return (
      <EditTile
        {...props}
        detached
        index={0}
        onSelectTile={() => {}}
        onFocusPreviousTile={() => {}}
        onFocusNextTile={() => {}}
        onAddTile={() => {}}
        onDeleteTile={() => {}}
        onMutateTile={() => {}}
        handleKeyDown={() => {}}
      />
    );
  }
  return '';
}

TileRenderer.propTypes = {
  edit: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TileRenderer;
