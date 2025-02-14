// Fixes timezone for jest snapshots
// Seen here https://stackoverflow.com/questions/56261381/how-do-i-set-a-timezone-in-my-jest-config
module.exports = async () => {
  process.env.TZ = 'UTC';
};
