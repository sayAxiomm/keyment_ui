/** @type {import("lint-staged").Configuration} */
export default {
  "*.{js,mjs,cjs,ts,vue}": ["eslint --fix --max-warnings=0 --no-warn-ignored", "prettier --write"],
  "*.{json,jsonc,css,scss,less,md,yaml,yml}": "prettier --write --ignore-unknown"
};
