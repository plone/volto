// Stable timezone for vitest snapshots
module.exports = async () => {
  process.env.TZ = 'UTC';
};
