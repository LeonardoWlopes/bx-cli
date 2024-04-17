import inquirer from 'inquirer'
import { EFunction } from '../enum/functions'
import { ERepositoryFileName } from '../enum/repository'
import { setupRepositoryFile } from '../functions/setup-repository-file'
import { command } from '../utils/commands'
import { fileExists } from '../utils/file'
import { fetchFilesRepository } from '../utils/http'
import { FUNCTIONS_MAPPER } from '../utils/mappers'
import { linterService } from './linter'

export async function configurationService() {
	const haveTsConfig = fileExists('tsconfig.json')

	const { configFiles, addLinting } = await inquirer.prompt<{
		configFiles: (ERepositoryFileName | EFunction)[]
		addLinting: boolean
	}>([
		{
			type: 'checkbox',
			name: 'configFiles',
			message: 'Select the configuration files you want to setup',
			choices: [
				{
					name: 'create .editorconfig',
					value: ERepositoryFileName.EDITOR_CONFIG,
					checked: true,
				},
				{
					name: 'create .nvmrc',
					value: EFunction.GENERATE_NVMRC,
					checked: true,
				},
				...(haveTsConfig
					? [
							{
								name: 'create ts paths',
								value: EFunction.GENERATE_TS_PATHS,
								checked: true,
							},
						]
					: []),
			],
		},
		{
			type: 'confirm',
			name: 'addLinting',
			message: 'Do you want to add linting configuration?',
			default: true,
		},
	])

	const repository = configFiles.filter((value) =>
		Object.values(ERepositoryFileName).includes(
			value as ERepositoryFileName,
		),
	) as ERepositoryFileName[]

	const functions = configFiles.filter((value) =>
		Object.values(EFunction).includes(value as EFunction),
	) as EFunction[]

	for (const func of functions) {
		await FUNCTIONS_MAPPER[func]()
	}

	if (repository.length > 0) {
		const filesRepository = await fetchFilesRepository()

		for (const fileName of repository) {
			await setupRepositoryFile(fileName, filesRepository)
		}

		if (!addLinting) await command.install()
	}

	if (addLinting) {
		console.clear()
		linterService()
	}
}
