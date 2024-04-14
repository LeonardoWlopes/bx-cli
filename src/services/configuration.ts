import chalk from 'chalk'
import inquirer from 'inquirer'
import { ERepositoryFileName } from '../enum/repository'
import { setupRepositoryFile } from '../functions/setup-repository-file'
import { command } from '../utils/commands'

export async function configurationService() {
	const { type, configFiles } = await inquirer.prompt<{
		type: ERepositoryFileName | ERepositoryFileName[]
		configFiles: ERepositoryFileName[]
	}>([
		{
			type: 'list',
			name: 'type',
			message: 'What linting tool do you want to use?',
			choices: [
				{
					name: 'BiomeJS',
					value: ERepositoryFileName.BIOME,
				},
				{
					name: 'ESLint/Prettier',
					value: [
						ERepositoryFileName.ESLINT,
						ERepositoryFileName.PRETTIER,
					],
				},
			],
		},
		{
			type: 'checkbox',
			name: 'configFiles',
			message: 'Select the configuration files you want to setup',
			choices: [
				{
					name: '.editorconfig',
					value: ERepositoryFileName.EDITOR_CONFIG,
				},
			],
		},
	])

	const fileNames = [...configFiles, ...(Array.isArray(type) ? type : [type])]

	console.log('')

	for (const fileName of fileNames) {
		try {
			await setupRepositoryFile(fileName)
			console.log(`Successfully setup ${chalk.blue(fileName)}`)
		} catch (error) {
			const err = error as Error
			console.error(chalk.red(err.message))
		}
	}

	console.log('')

	await command.install()
}
