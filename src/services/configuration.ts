import inquirer from 'inquirer'
import { EFunction } from '../enum/functions'
import { ERepositoryFileName } from '../enum/repository'
import { setupRepositoryFile } from '../functions/setup-repository-file'
import { command } from '../utils/commands'
import { fetchFilesRepository } from '../utils/http'
import { FUNCTIONS_MAPPER } from '../utils/mappers'

export async function configurationService() {
	const { type, configFiles } = await inquirer.prompt<{
		type: ERepositoryFileName | ERepositoryFileName[]
		configFiles: (ERepositoryFileName | EFunction)[]
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
					checked: true,
				},
				{
					name: '.nvmrc',
					value: EFunction.GENERATE_NVMRC,
					checked: true,
				},
			],
		},
	])

	console.log('')

	const filesRepository = await fetchFilesRepository()

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

	const fileNames = [repository, type].flatMap((item) =>
		Array.isArray(item) ? item : [item],
	)

	for (const fileName of fileNames) {
		await setupRepositoryFile(fileName, filesRepository)
	}

	console.log('')

	await command.install()
}
