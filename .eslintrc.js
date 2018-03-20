module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 2017
	},
	extends: "eslint:recommended",
	rules: {
		"no-undef": "error",
		"no-extra-semi": "error",
		"global-require": "off",
		"brace-style": "error",
		"eol-last": "error",
		"no-extra-bind": "warn",
		"no-process-exit": "warn",
		"no-use-before-define": "off",
		"no-unused-vars": ["error", { args: "none" }],
		"no-unsafe-negation": "error",
		"no-loop-func": "warn",
		"no-console": "off"
	}
};
