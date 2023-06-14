import { useSelector, shallowEqual } from 'react-redux';

export function useNavigation() {
  const items= useSelector((state) =>  state.navigation.items, shallowEqual);
  return items;
}
