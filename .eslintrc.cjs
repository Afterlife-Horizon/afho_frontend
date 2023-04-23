module.exports = {
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended",
		"prettier/react",
		"next/core-web-vitals"
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	root: true
}
