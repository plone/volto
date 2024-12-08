import PropTypes from 'prop-types';
import cx from 'classnames';
import ContainerEdit from '../Container/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { setUIState } from '@plone/volto/actions/form/form';

const GridBlockEdit = (props) => {
  const { data } = props;

  const columnsLength = data?.blocks_layout?.items?.length || 0;

  const selectedBlock = useSelector((state) => state.form.ui.gridSelected);
  const dispatch = useDispatch();

  return (
    <div
      className={cx({
        one: columnsLength === 1,
        two: columnsLength === 2,
        three: columnsLength === 3,
        four: columnsLength >= 4,
        'grid-items': true,
      })}
      // This is required to enabling a small "in-between" clickable area
      // for bringing the Grid sidebar alive once you have selected an inner block
      onClick={(e) => {
        if (!e.block) dispatch(setUIState({ gridSelected: null }));
      }}
      role="presentation"
    >
      <ContainerEdit
        {...props}
        selectedBlock={selectedBlock}
        setSelectedBlock={(id) => dispatch(setUIState({ gridSelected: id }))}
        direction="horizontal"
      />
    </div>
  );
};

GridBlockEdit.propTypes = {
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
};

export default GridBlockEdit;
