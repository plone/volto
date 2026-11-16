import {
  decodeStatusMessages,
  takeStatusMessages,
  STATUSMESSAGES_COOKIE,
} from './StatusMessages';

// Made with Products.statusmessages: Message(...).encode(), base64 and quote.
const ONE =
  'B4RUaGUgSUQgb2YgdGhpcyBHcmFwaCBpcyAiZW1pc3NpZS12YW4tb3pvbmFmYnJla2VuZGUtc3RvZmZlbiJpbmZv';
const THREE =
  'BERIZXQgSUQgdmFuIGRlemUgZ3JhZmllayBpcyAiw6nDqW4iaW5mbwIkWm9uZGVyIMO8IGdlZW4gw7Z3YXJuAIVGb3V0ZXJyb3I%3D';

describe('decodeStatusMessages', () => {
  it('decodes a message', () => {
    expect(decodeStatusMessages(ONE)).toEqual([
      {
        message: 'The ID of this Graph is "emissie-van-ozonafbrekende-stoffen"',
        type: 'info',
      },
    ]);
  });

  it('decodes several messages, URL-encoded and in UTF-8', () => {
    expect(decodeStatusMessages(THREE)).toEqual([
      { message: 'Het ID van deze grafiek is "één"', type: 'info' },
      { message: 'Zonder ü geen ö', type: 'warn' },
      { message: 'Fout', type: 'error' },
    ]);
  });

  it('accepts a quoted value', () => {
    expect(decodeStatusMessages('"AIVGb3V0ZXJyb3I="')).toEqual([
      { message: 'Fout', type: 'error' },
    ]);
  });

  it('ignores a value that is not a status message', () => {
    expect(decodeStatusMessages('%E0%A4%A')).toEqual([]);
    expect(decodeStatusMessages('not base64!')).toEqual([]);
    expect(decodeStatusMessages('')).toEqual([]);
    // A header that announces 4 bytes of invalid UTF-8.
    expect(decodeStatusMessages(btoa('\x00\x80\xff\xfe\xfd\xfc'))).toEqual([]);
  });
});

describe('takeStatusMessages', () => {
  it('returns the messages and removes the cookie', () => {
    document.cookie = `${STATUSMESSAGES_COOKIE}=${ONE}; path=/`;
    expect(takeStatusMessages()).toHaveLength(1);
    expect(document.cookie).not.toContain(STATUSMESSAGES_COOKIE);
    expect(takeStatusMessages()).toEqual([]);
  });
});
