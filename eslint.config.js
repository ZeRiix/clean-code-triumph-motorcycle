import {duplojsEslintBase, duplojsEslintOpen} from "@duplojs/eslint";

export default [
	{
		...duplojsEslintBase,
		files: ["**/*.ts"],
	},
	{
		...duplojsEslintOpen,
		files: ["domains/types/index.ts"],
	},
	{
		ignores: ["coverage", "dist"]
	}
];