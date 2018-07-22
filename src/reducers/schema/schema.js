/**
 * Schema reducer.
 * @module reducers/schema/schema
 */

import {
  flatten,
  filter,
  keys,
  omitBy,
  pickBy,
  isPlainObject,
  isArray,
  map,
} from 'lodash';

import { GET_SCHEMA } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  schema: null,
};

/**
 * Schema reducer.
 * @function schema
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function schema(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_SCHEMA}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_SCHEMA}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        schema: {
          ...action.result,
          required: [
            ...action.result.required,
            ...flatten(
              map(keys(pickBy(action.result.properties, isArray)), fieldset =>
                map(
                  action.result.definitions[fieldset].required,
                  required => `${fieldset}|${required}`,
                ),
              ),
            ),
          ],
          fieldsets:
            action.result.fieldsets ||
            filter(
              [
                {
                  fields: keys(
                    omitBy(
                      pickBy(action.result.properties, isPlainObject),
                      field => field.readonly,
                    ),
                  ),
                  id: 'default',
                  title: 'Default',
                },
                ...map(
                  keys(
                    omitBy(
                      pickBy(action.result.properties, isArray),
                      field => field.readonly,
                    ),
                  ),
                  fieldset => ({
                    fields: map(
                      keys(action.result.definitions[fieldset].properties),
                      field => `${fieldset}|${field}`,
                    ),
                    id: fieldset,
                    title: action.result.definitions[fieldset].title,
                  }),
                ),
              ],
              fieldset => fieldset.fields.length > 0,
            ),
        },
      };
    case `${GET_SCHEMA}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        schema: null,
      };
    default:
      return state;
  }
}
