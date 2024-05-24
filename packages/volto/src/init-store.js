import serialize from 'serialize-javascript';

const initialState = {
  userSession: {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYwMDY1NTM1OSwiZnVsbG5hbWUiOm51bGx9.G7vqPxmRTQkJkLlRoUFZIJRJqdjjKcc9Ymacty9_h0g',
  },
  intl: {
    defaultLocale: 'en',
    locale: 'en',
    messages: {},
  },
};

window.__data = serialize(initialState);
