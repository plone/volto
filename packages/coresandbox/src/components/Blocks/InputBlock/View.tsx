import type { BlockViewProps } from '@plone/types';

const InputBlockView = (props: BlockViewProps) => {
  return (
    <div className="test-block">
      <div>Input Block</div>
      <p>{JSON.stringify(props.data)}</p>
    </div>
  );
};

export default InputBlockView;
