export const getWidget = (id, field) => {
  if (id === 'title') {
    return 'title';
  }
  if (id === 'description') {
    return 'description';
  }
  if (id === 'subjects') {
    return 'tags';
  }
  if (field?.factory === 'Choice') {
    return 'choices';
  }
  if (field?.factory === 'Relation Choice') {
    return 'relation';
  }
  if (field?.factory === 'Relation List') {
    return 'relations';
  }
  if (field?.factory === 'Image') {
    return 'image';
  }
  if (field?.factory === 'File') {
    return 'file';
  }
  return field?.widget || field?.type || id;
};
