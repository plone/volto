/* eslint no-console: 0 */
import https from 'https';
import { execSync } from 'child_process';

if (process.argv.length < 2) {
  console.log(process.argv.length);
  process.exit(1);
}

const pr = process.argv[2];
const URL = `https://api.github.com/repos/plone/volto/pulls/${pr}`;

function getPRInfo(pr) {
  return new Promise((resolve, reject) => {
    https
      .get(
        URL,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            'User-Agent': 'node.js',
            Accept: 'application/vnd.github+json',
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
              branchName: res.head.ref,
              mergeCommit: res.merge_commit_sha,
            });
          });
        },
      )
      .on('error', (err) => {
        reject(err.message);
      });
  });
}

function execCommand(command) {
  execSync(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
}

async function main(params) {
  const PRInfo = await getPRInfo(pr);

  execCommand(`git pull`);
  execCommand(`git co -b ${PRInfo.branchName}__16`);
  execCommand(`git cherry-pick ${PRInfo.mergeCommit}`);
  execCommand(`git push`);
  execCommand(`git co 16.x.x`);
}

main();
