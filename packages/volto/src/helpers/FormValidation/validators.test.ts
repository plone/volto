import { urlValidator } from './validators';

const formatMessage = (msg: string) => msg;

describe('urlValidator', () => {
  const isValidURL = {
    id: 'url',
    defaultMessage:
      'Input must be valid url (www.something.com or http(s)://www.something.com)',
  };

  it('accepts http and https URLs', () => {
    expect(
      urlValidator({ value: 'http://example.com', formatMessage }),
    ).toBeNull();
    expect(
      urlValidator({ value: 'https://example.com', formatMessage }),
    ).toBeNull();
  });

  it('accepts URLs without protocol', () => {
    expect(urlValidator({ value: 'example.com', formatMessage })).toBeNull();
    expect(
      urlValidator({ value: 'www.example.com', formatMessage }),
    ).toBeNull();
  });

  it('accepts URLs with subdomains', () => {
    expect(
      urlValidator({ value: 'sub.domain.example.com', formatMessage }),
    ).toBeNull();
  });

  it('accepts URLs with ports', () => {
    expect(
      urlValidator({ value: 'http://example.com:8080', formatMessage }),
    ).toBeNull();
    expect(urlValidator({ value: 'localhost:3000', formatMessage })).toBeNull();
  });

  it('accepts URLs with paths', () => {
    expect(
      urlValidator({
        value: 'http://example.com/path/to/resource',
        formatMessage,
      }),
    ).toBeNull();
    expect(
      urlValidator({ value: 'example.com/path', formatMessage }),
    ).toBeNull();
  });

  it('accepts URLs with query strings', () => {
    expect(
      urlValidator({
        value: 'http://example.com?foo=bar&baz=qux',
        formatMessage,
      }),
    ).toBeNull();
    expect(
      urlValidator({ value: 'example.com/path?foo=bar', formatMessage }),
    ).toBeNull();
  });

  it('accepts URLs with fragments', () => {
    expect(
      urlValidator({ value: 'http://example.com#section', formatMessage }),
    ).toBeNull();
    expect(
      urlValidator({ value: 'example.com/path#anchor', formatMessage }),
    ).toBeNull();
  });

  it('accepts IPv4 addresses', () => {
    expect(
      urlValidator({ value: 'http://127.0.0.1', formatMessage }),
    ).toBeNull();
    expect(urlValidator({ value: '127.0.0.1', formatMessage })).toBeNull();
  });

  it('accepts localhost', () => {
    expect(urlValidator({ value: 'localhost', formatMessage })).toBeNull();
    expect(
      urlValidator({ value: 'http://localhost', formatMessage }),
    ).toBeNull();
  });

  it('rejects invalid URLs', () => {
    expect(
      urlValidator({ value: 'htp://example.com', formatMessage }),
    ).toStrictEqual(isValidURL);
    expect(
      urlValidator({ value: '://example.com', formatMessage }),
    ).toStrictEqual(isValidURL);
    expect(urlValidator({ value: 'example', formatMessage })).toStrictEqual(
      isValidURL,
    );
    expect(urlValidator({ value: 'http://', formatMessage })).toStrictEqual(
      isValidURL,
    );
    expect(urlValidator({ value: '', formatMessage })).toStrictEqual(
      isValidURL,
    );
    expect(
      urlValidator({ value: '/absolute/path', formatMessage }),
    ).toStrictEqual(isValidURL);
    expect(
      urlValidator({ value: './relative/path', formatMessage }),
    ).toStrictEqual(isValidURL);
  });
});
