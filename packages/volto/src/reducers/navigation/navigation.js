// Importing necessary functions and constants from external modules
import { map } from 'lodash';
import {
  flattenToAppURL,
  getBaseUrl,
  hasApiExpander,
} from '@plone/volto/helpers';

import {
  GET_CONTENT,
  GET_NAVIGATION,
} from '@plone/volto/constants/ActionTypes';

// Initial state for the navigation reducer
const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
};

// Function to transform navigation items recursively
function transformItems(items) {
  // Using a stack-based approach for recursive transformation
  const stack = [...items];
  const transformedItems = [];

  // Iterating through items in the stack
  while (stack.length > 0) {
    const currentItem = stack.pop();
    // Transforming the current item
    const transformedItem = {
      ...currentItem,
      // Flattening the URL to be app-relative
      url: flattenToAppURL(currentItem['@id']),
      // Including any extra behavior fields or information passed from the endpoint
      // Example: extraField: currentItem.extraField,
    };

    // Checking if the current item has sub-items
    if (currentItem.items) {
      // Transforming sub-items
      transformedItem.items = currentItem.items.map((item) => ({
        ...item,
        url: flattenToAppURL(item['@id']),
        // Including any extra behavior fields or information for sub-items
        // Example: extraField: item.extraField,
      }));
      // Adding sub-items to the stack for further processing
      stack.push(...currentItem.items);
    }

    // Adding the transformed item to the result array
    transformedItems.push(transformedItem);
  }

  // Returning the transformed items
  return transformedItems;
}

// Reducer function for navigation state management
export default function navigation(state = initialState, action = {}) {
  switch (action.type) {
    // Handling pending navigation request
    case `${GET_NAVIGATION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    // Handling successful content retrieval
    case `${GET_CONTENT}_SUCCESS`:
      // Checking if the retrieved content has a navigation expander
      const hasExpander = hasApiExpander(
        'navigation',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      // Checking if the action is not a subrequest and the content has an expander
      if (hasExpander && !action.subrequest) {
        return {
          ...state,
          error: null,
          // Transforming and updating the navigation items
          items: transformItems(
            action.result['@components'].navigation.items,
          ),
          loaded: true,
          loading: false,
        };
      }
      return state;
    // Handling successful navigation retrieval
    case `${GET_NAVIGATION}_SUCCESS`:
      // Checking if the retrieved navigation has items
      if (!action.result?.['@components'] && action.result?.items) {
        return {
          ...state,
          error: null,
          // Transforming and updating the navigation items
          items: transformItems(action.result.items),
          loaded: true,
          loading: false,
        };
      }
      return state;
    // Handling failed navigation retrieval
    case `${GET_NAVIGATION}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [], // Clearing items in case of failure
        loaded: false,
        loading: false,
      };
    // Default case: returning current state
    default:
      return state;
  }
}
