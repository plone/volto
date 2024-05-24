import type { BlockViewProps } from '@plone/types';

const InputBlockView = (props: BlockViewProps) => {
  return (
    <div className="test-block">
      <div>Test Block</div>
      <p>{JSON.stringify(props.data)}</p>
    </div>
  );
};

export default InputBlockView;
