import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';

const BlockWrapper = (props: any) => {
  const { block, data, isContainer } = props;
  const content = props.content || {
    blocks: {},
    blocks_layout: {
      items: [],
    },
  };

  return (
    <StyleWrapper
      content={content}
      id={block || 'block-1'}
      block={block || 'block-1'}
      data={data}
      isContainer={isContainer}
    >
      {props.children}
    </StyleWrapper>
  );
};

export default BlockWrapper;
