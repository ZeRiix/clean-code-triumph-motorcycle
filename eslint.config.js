import { duplojsEslintBase, duplojsEslintOpen } from "@duplojs/eslint";

export default [
	{
		...duplojsEslintBase,
		files: ["**/*.ts"],
		ignores: ["frontend"],
	},
	{
		...duplojsEslintOpen,
		files: [
			"domains/types/index.ts",
			"applications/interfaces/repositories/*.ts",
			"domains/entities/index.ts"
		],
	},
	{
		ignores: ["coverage", "dist", "frontend"],
	}
];