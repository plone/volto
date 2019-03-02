/**
 * Layouts.
 * @module constants/Workflows
 */

import { last, split } from 'lodash';

// { value: 'private', label: 'Private', color: '#ed4033' },
// { value: 'public', label: 'Public', color: '#007bc1' },
// { value: 'intranet', label: 'Intranet', color: '#51aa55' },
// { value: 'draft', label: 'Draft', color: '#f6a808' },
// { value: 'review', label: 'Review', color: '#f4e037' },

export default function getWorkflowMapping(url, current) {
  const mapping = {
    published: { value: 'public', label: 'Public', color: '#007bc1', url },
    publish: { value: 'public', label: 'Public', color: '#007bc1', url },
    private: { value: 'private', label: 'Private', color: '#ed4033', url },
    pending: { value: 'pending', label: 'Pending', color: '#f6a808', url },
    send_back: { value: 'private', label: 'Private', color: '#ed4033', url },
    retract: { value: 'private', label: 'Private', color: '#ed4033', url },
    submit: { value: 'review', label: 'Review', color: '#f4e037', url },
  };

  if (url) {
    const key = last(split(url, '/'));
    if (key in mapping) {
      return mapping[key];
    }

    return { value: key, label: key, color: '#000', url };
  }

  if (current in mapping) {
    return mapping[current];
  }

  return { value: current, label: current, color: '#000', url };
}
