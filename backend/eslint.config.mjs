import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      indent: ["error", 2],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      camelcase: "error",
      "node/no-missing-import": "off",
    },
  },
];
