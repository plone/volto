import NewBlockAddButton from './NewBlockAddButton';

const emptyRowCellEditBlock = ({
  block,
  blocksConfig,
  data,
  onChangeBlock,
}) => {
  return (
    <div className="uber-grid-default-item">
      <p>Add a new block</p>
      <NewBlockAddButton
        block={block}
        blocksConfig={blocksConfig}
        onMutateBlock={(block, value) =>
          onChangeBlock(block, {
            ...data,
            ...value,
          })
        }
      />
    </div>
  );
};

export default emptyRowCellEditBlock;
