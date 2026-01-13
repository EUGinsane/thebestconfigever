import js from "@eslint/js"
import tanStackQuery from "@tanstack/eslint-plugin-query"
import custom from "eslint-plugin-custom"
import prettier from "eslint-plugin-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
      custom,
      "@tanstack/query": tanStackQuery,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      ...tanStackQuery.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "react/prop-types": [0],
      "custom/no-as": "error",
      "custom/no-is": "error",
    },
  },
)
