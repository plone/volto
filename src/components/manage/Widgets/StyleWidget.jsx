import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';

const StyleWidget = (props) => {
  const { block, onChange, schema } = props;

  return (
    <div className="styles-widget">
      <ObjectWidget
        {...props}
        block={block}
        schema={schema}
        onChange={onChange}
      />
    </div>
  );
};
export default StyleWidget;
