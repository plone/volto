const resultTypeMapper = (contentType) =>
  this.props.contentTypeSearchResultViews[contentType] ||
  this.props.contentTypeSearchResultDefaultView;

const TemplateSelector = ({ children, ...props }) => {
  const { item } = props;
  return (
    <div key={item['@id']}>
      {createElement(resultTypeMapper(item['@type']), props, children)}
    </div>
  );
};
