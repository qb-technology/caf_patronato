// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt().overrideRules({
// Your custom configs here
  'vue/html-self-closing': 'off',
});
