import PropTypes from 'prop-types';
import cx from 'classnames';
import ContainerEdit from '../Container/Edit';

const GridBlockEdit = (props) => {
  const { data } = props;

  const columnsLength = data?.blocks_layout?.items?.length || 0;

  return (
    <div
      className={cx({
        one: columnsLength === 1,
        two: columnsLength === 2,
        three: columnsLength === 3,
        four: columnsLength >= 4,
        'grid-items': true,
      })}
    >
      <ContainerEdit {...props} direction="horizontal" />
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
