/* eslint no-console: 0 */
import https from 'https';
import { execSync } from 'child_process';

if (process.argv.length < 2) {
  console.log(process.argv.length);
  process.exit(1);
}

const pr = process.argv[2];
const URL = `https://api.github.com/repos/plone/volto/pulls/${pr}`;

function getPRInfo() {
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
  return execSync(command, (error, stdout, stderr) => {
    console.log(stdout);
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    return stdout;
  });
}

async function main() {
  const PRInfo = await getPRInfo();

  // const currentBranch = execCommand(
  //   `git rev-parse --abbrev-ref HEAD`,
  // ).toString();
  // execCommand(`git co -b ${PRInfo.branchName}__${currentBranch.split('.')[0]}`);

  // Now we do that in the same PR
  execCommand(`git cherry-pick ${PRInfo.mergeCommit}`);

  // execCommand(`git push`);
  // execCommand(`git co $(git rev-parse --abbrev-ref HEAD)`);
}

main();
