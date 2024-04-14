import { ERepositoryFileName } from '@/enum/repository'
import { setupRepositoryFile } from '@/functions/setup-repository-file'
import { command } from '@/utils/commands'
import chalk from 'chalk'
import inquirer from 'inquirer'

export async function configurationService() {
	const { type, configFiles } = await inquirer.prompt<{
		type: ERepositoryFileName
		configFiles: ERepositoryFileName[]
	}>([
		{
			type: 'list',
			name: 'type',
			message: 'What linting tool do you want to use?',
			choices: [
				{
					name: 'Biome',
					value: ERepositoryFileName.BIOME,
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

	const fileNames = [type, ...configFiles]

	console.log('')

	for (const fileName of fileNames) {
		await setupRepositoryFile(fileName)
		console.log(`Successfully setup ${chalk.blue(fileName)}`)
	}

	console.log('')

	await command.install()
}
