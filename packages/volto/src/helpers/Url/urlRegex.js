/* eslint-disable  arrow-body-style */
/* eslint-disable  no-confusing-arrow */
import tlds from 'tlds';

export const mailRegex = () =>
  /^((mailto:[^<>()/[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const telRegex = () =>
  /^[tel:]*[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;

const v4 =
  '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
const v6seg = '[0-9a-fA-F]{1,4}';
const v6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${v4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${v4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${v4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${v4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${v4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`
  .replace(/\s*\/\/.*$/gm, '')
  .replace(/\n/g, '')
  .trim();

const ipRegex = (opts) =>
  opts && opts.exact
    ? new RegExp(`(?:^${v4}$)|(?:^${v6}$)`)
    : new RegExp(`(?:${v4})|(?:${v6})`, 'g');

ipRegex.v4 = (opts) =>
  opts && opts.exact ? new RegExp(`^${v4}$`) : new RegExp(v4, 'g');
ipRegex.v6 = (opts) =>
  opts && opts.exact ? new RegExp(`^${v6}$`) : new RegExp(v6, 'g');

export const urlRegex = (_opts) => {
  const opts = Object.assign({ strict: true }, _opts);
  const protocol = `(?:(?:[a-z]+:)?//)${opts.strict ? '' : '?'}`;
  const auth = '(?:\\S+(?::\\S*)?@)?';
  const ip = ipRegex.v4().source;
  const host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
  const domain =
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
  const tld = `(?:\\.${
    opts.strict
      ? '(?:[a-z\\u00a1-\\uffff]{2,})'
      : `(?:${tlds.sort((a, b) => b.length - a.length).join('|')})`
  })\\.?`;
  const port = '(?::\\d{2,5})?';
  const path = '(?:[/?#][^\\s"]*)?';
  const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld}|${host})${port}${path}`;

  return opts.exact
    ? new RegExp(`(?:^${regex}$)`, 'i')
    : new RegExp(regex, 'ig');
};
