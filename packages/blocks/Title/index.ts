import React from 'react';

const TitleBlockInfo = {
  id: 'title',
  title: 'Title',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TitleBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TitleBlockEdit'),
  ),
  // Just for testing purposes, we must remove this
  // Uncomment and define blockSchema if needed
  // blockSchema: {
  //   fieldsets: [
  //     {
  //       id: 'default',
  //       title: 'Default',
  //       fields: ['title', 'description'], // Example fields, adjust as needed
  //     },
  //   ],
  //   properties: {
  //     title: {
  //       type: 'string',
  //       title: 'Title',
  //     },
  //     description: {
  //       type: 'string',
  //       title: 'Description',
  //     },
  //   },
  //   required: ['title'],
  // },
  category: 'heading',
};

export default TitleBlockInfo;
