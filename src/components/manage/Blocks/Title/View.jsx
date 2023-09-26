const TitleBlockView = ({ properties, metadata }) => {
  return (
    <h1 className="documentFirstHeading">
      {(metadata || properties)['title'] || ''}
    </h1>
  );
};

export default TitleBlockView;
