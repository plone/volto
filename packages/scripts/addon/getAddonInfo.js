/* eslint no-console: 0 */
import https from 'https';
import GitUrlParse from 'git-url-parse';

/*
 * Retrieves latest Volto released version from NPM registry
 */
export async function getGitAddonInfo({ source, branch = 'main', isPrivate }) {
  const sourceParse = GitUrlParse(source);
  const packageJSONURL = isPrivate
    ? `https://api.github.com/repos/${sourceParse.full_name}/contents/package.json`
    : `https://raw.githubusercontent.com/${sourceParse.full_name}/${branch}/package.json`;

  return new Promise((resolve, reject) => {
    https
      .get(
        packageJSONURL,
        {
          headers: {
            ...(isPrivate
              ? {
                  Authorization: `token ${process.env.GITHUB_TOKEN}`,
                  'User-Agent': 'node.js',
                  Accept: 'application/vnd.github.VERSION.raw',
                }
              : {}),
          },
        },
        (resp) => {
          let data = [];
          resp.on('data', (chunk) => {
            data.push(chunk);
          });
          resp.on('end', () => {
            const res = JSON.parse(data.join(''));
            resolve({
              name: res.name,
              version: res.version,
              ...(res.name.includes('@')
                ? { fullname: res.name, name: res.name.split('/')[1] }
                : {}),
            });
          });
        },
      )
      .on('error', (err) => {
        reject(err.message);
      });
  });
}
