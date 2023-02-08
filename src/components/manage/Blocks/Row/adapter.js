export const RowBlockDataAdapter = ({
  block,
  data,
  id,
  onChangeBlock,
  value,
}) => {
  let dataSaved = {
    ...data,
    [id]: value,
  };
  if (id === 'direction') {
    dataSaved = {
      ...dataSaved,
      '@type': value,
    };
  }
  onChangeBlock(block, dataSaved);
};
