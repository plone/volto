import { createStore } from 'redux';

export const createStaticStore = (state) =>
  createStore((currentState = state) => currentState);
