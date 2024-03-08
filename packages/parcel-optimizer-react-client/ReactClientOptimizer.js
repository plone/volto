/** This Parcel plugin adds the inglorious "use client" in the built bundle */
const { Optimizer } = require('@parcel/plugin');
const { blobToString } = require('@parcel/utils');

module.exports = new Optimizer({
  async optimize({ bundle, contents, map }) {
    if (!/components/.test(bundle.target.distDir)) {
      return { contents, map };
    }

    map?.offsetLines(2, 0);
    return {
      contents: `"use client";

${await blobToString(contents)}`,
      map,
    };
  },
});
