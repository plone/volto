// import superagent from 'superagent';

// import Api from './Api';

jest.mock('react-cookie', () => ({
  load: jest.fn(() => 'token'),
}));

jest.mock('superagent', () => ({
  get: jest.fn(() => ({
    query: jest.fn(),
    set: jest.fn(),
    type: jest.fn(),
    send: jest.fn(),
    end: jest.fn(),
  })),
}));

// const api = new Api();

test('get request', () => {});
