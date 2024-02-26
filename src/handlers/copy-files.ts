import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import { EConfigOptions, EStackOptions } from '../enums/options'
import { Templates } from '../utils/templates'

export async function copyFiles(option: EConfigOptions, stack: EStackOptions) {
	const templates = new Templates(stack)

	switch (option) {
		case EConfigOptions.ESLINT: {
			const prettier = templates.getPrettier()
			const eslint = templates.getEslint()

			fs.writeFileSync(
				path.join(process.cwd(), '.prettierrc'),
				JSON.stringify(prettier, null, templates.identSize),
			)

			fs.writeFileSync(
				path.join(process.cwd(), '.eslintrc.json'),
				JSON.stringify(eslint, null, templates.identSize),
			)
		}
	}

	const editorConfig = templates.getEditorConfig()

	fs.writeFileSync(path.join(process.cwd(), '.editorconfig'), editorConfig)

	console.log(chalk.green('✅ Config files created'))
}
