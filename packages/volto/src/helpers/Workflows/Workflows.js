/**
 * Layouts.
 * @module constants/Workflows
 */

import config from '@plone/volto/registry';
import { last, split } from 'lodash-es';

/**
 * Maps the available transitions to the current list of colors and returns a
 * react-select option object
 * @param  {Object} transition
 *  {id: "published", title: "Published"}
 * @return {Object} The react-select options object
 *  { value: 'published', label: 'Published', color: '#007bc1' }
 */
export function getCurrentStateMapping(state) {
  const mapping = config.settings.workflowMapping;

  if (state.id in mapping) {
    return { label: state.title, ...mapping[state.id] };
  }

  // Return an option with a neutral color
  return {
    value: state.id,
    label: state.title,
    color: '#000',
  };
}

/**
 * Maps the available transitions to the current list of colors and returns a
 * react-select option object
 * @param  {Object} transition
 *  {
 *     '@id': 'http://localhost:3000/de/@workflow/publish',
 *     title: 'Veröffentlichen'
 *  }
 * @return {Object} The react-select options object
 *  { value: 'public', label: 'Published', color: '#007bc1', url: 'http://localhost:3000/de/@workflow/publish' }
 */
export function getWorkflowOptions(transition) {
  const mapping = config.settings.workflowMapping;
  const key = last(split(transition['@id'], '/'));

  if (key in mapping) {
    return { label: transition.title, ...mapping[key], url: transition['@id'] };
  }

  // Return an option with a neutral color
  return {
    value: key,
    label: transition.title,
    color: '#000',
    url: transition['@id'],
  };
}
