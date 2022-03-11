export const insertInArray = (array, element, index) => [
  ...array.slice(0, index),
  element,
  ...array.slice(index),
];

export const replaceItemOfArray = (array, index, value) =>
  Object.assign([...array], { [index]: value });

export const removeFromArray = (array, index) => {
  let newArray = array.slice();
  newArray.splice(index, 1);
  return newArray;
};

export const reorderArray = (list, origin, target) => {
  const result = Array.from(list);
  const [removed] = result.splice(origin, 1);
  result.splice(target, 0, removed);

  return result;
};
