/**
 * Maps the available transitions to the current list of colors and returns a
 * react-select option object
 * @param  {Object} transition
 *  {id: "published", title: "Published"}
 * @return {Object} The react-select options object
 *  { value: 'published', label: 'Published', color: '#007bc1' }
 */
export function getCurrentStateMapping(state: any): any;
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
export function getWorkflowOptions(transition: any): any;
