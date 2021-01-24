import express from 'express';
import ImageCache from './image-proxy/cache';
import { Image } from './image-proxy/Image';

async function imageMiddleware(req, res, next) {
  const { errorHandler } = req.app.locals;
  const cache = ImageCache();

  const image = new Image(req, cache, errorHandler);
  try {
    const output = await image.getData();

    res.setHeader('Content-Type', `image/${output.format}`);
    res.status(200).send(output.data);
  } catch (err) {
    errorHandler(err);
  }
}

export default function () {
  const middleware = express.Router();

  middleware.all(['**/@@images/*'], imageMiddleware);
  middleware.id = 'imageResourcesProcessor';
  return middleware;
}
