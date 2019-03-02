// If the repository is not private, use an ENV var to pass the secrets instead
// of saving them on the config file
const secretTokens = {
  GOOGLE_RECAPTCHA_PRIVATE_TOKEN:
    process.env.RAZZLE_GOOGLE_RECAPTCHA_PRIVATE_TOKEN || '',
};

const publicTokens = {
  GOOGLE_RECAPTCHA_PUBLIC_TOKEN:
    process.env.RAZZLE_GOOGLE_RECAPTCHA_PUBLIC_TOKEN || '',
};

export { secretTokens };
export { publicTokens };
