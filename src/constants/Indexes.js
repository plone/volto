/**
 * Layouts.
 * @module constants/Layouts
 */

export default {
  sortable_title: { label: 'Title', type: 'string', sort_on: 'sortable_title' },
  review_state: { label: 'Review state', type: 'string' },
  ModificationDate: {
    label: 'Last modified',
    type: 'date',
    sort_on: 'modified',
  },
  EffectiveDate: {
    label: 'Publication date',
    type: 'date',
    sort_on: 'effective',
  },
  id: { label: 'ID', type: 'string', sort_on: 'id' },
  ExpirationDate: { label: 'Expiration date', type: 'date' },
  CreationDate: { label: 'Created on', type: 'date', sort_on: 'created' },
  Subject: { label: 'Tags', type: 'array' },
  portal_type: { label: 'Type', type: 'string', sort_on: 'portal_type' },
  is_folderish: { label: 'Folder', type: 'boolean' },
  exclude_from_nav: { label: 'Excluded from navigation', type: 'boolean' },
  getObjSize: { label: 'Object Size', type: 'string' },
  last_comment_date: { label: 'Last comment date', type: 'date' },
  total_comments: { label: 'Total comments', type: 'number' },
  end: { label: 'End Date', type: 'date' },
  Description: { label: 'Description', type: 'string' },
  Creator: { label: 'Creator', type: 'string' },
  location: { label: 'Location', type: 'string' },
  UID: { label: 'UID', type: 'string' },
  start: { label: 'Start Date', type: 'date' },
  Type: { label: 'Type', type: 'string' },
};

export const defaultIndexes = [
  'review_state',
  'ModificationDate',
  'EffectiveDate',
];
