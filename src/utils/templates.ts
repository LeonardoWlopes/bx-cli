import { EStackOptions } from '../enums/options'

export class Templates {
	private stack: EStackOptions
	identSize = 4

	constructor(stack: EStackOptions) {
		this.stack = stack
	}

	getPrettier() {
		return {
			bracketSpacing: true,
			endOfLine: 'lf',
			insertPragma: false,
			jsxSingleQuote: true,
			jsxBracketSameLine: false,
			printWidth: 80,
			proseWrap: 'preserve',
			semi: false,
			singleQuote: true,
			trailingComma: 'all',
			useTabs: true,
		}
	}

	getEslint() {
		return {
			extends: `@rocketseat/eslint-config/${this.stack.toLowerCase()}`,
			plugins: ['unused-imports'],
			rules: {
				'no-use-before-define': 'off',
				'unused-imports/no-unused-imports-ts': 1,
				'prettier/prettier': ['error', this.getPrettier()],
			},
		}
	}

	getEditorConfig() {
		return `
root = true

[*]
indent_style = tab
indent_size = ${this.identSize}
end_of_line = lf
charset = utf-8
`
	}
}
