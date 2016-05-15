/**
 * Module for the backend API.
 * @module api
 */
 
import express from 'express';

const app = express();

export { app };

app.get('/home', (req, res) => {
  res.json({
    content: {
      title: 'Welcome to Plone',
      description: 'This is the description',
      body: '<p>Some body text with <b>markup</b></p>',
    },
    layout: [
      [
        {
          width: 4,
          content: 'Tile 1',
        },
        {
          width: 8,
          content: 'Tile 2',
        },
      ],
      [
        {
          width: 12,
          content: 'Tile 3',
        }
      ],
    ],
  });
});

app.get('/about', (req, res) => {
  res.json({
    content: {
      title: 'About page',
      description: 'This is the about description',
      body: '<p>About body text with <b>markup</b></p>',
    }
  });
});
