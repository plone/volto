export const hasNewContentsFeatureFlag =
  (__CLIENT__ && window?.env?.RAZZLE_USE_NEW_CONTENTS) ||
  process.env.RAZZLE_USE_NEW_CONTENTS;
