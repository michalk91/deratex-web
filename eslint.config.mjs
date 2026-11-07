import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: [".next/**"] },
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "@next/next": nextPlugin, "react-hooks": reactHooks },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ["components/slider/Slider.js"],
    rules: { "@next/next/no-img-element": "off" },
  },
];
