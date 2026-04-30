import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/.firebase/**",
      "**/out/**",
      "**/build/**",
      "**/node_modules/**",
      "next-env.d.ts",
      "**/*.min.js",
      "**/*.min.cjs",
      "playwright-report/**",
      "test-results/**",
      "*.mjs",
      "*.cjs",
    ],
  },
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
