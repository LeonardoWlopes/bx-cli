import inquirer from 'inquirer'
import { ERepositoryFileName } from '../enum/repository'
import { setupRepositoryFile } from '../functions/setup-repository-file'
import { command } from '../utils/commands'
import { fetchFilesRepository } from '../utils/http'

export async function linterService() {
	const { type } = await inquirer.prompt<{
		type: ERepositoryFileName | ERepositoryFileName[]
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
	])

	console.log('')

	const filesRepository = await fetchFilesRepository()

	const fileNames = Array.isArray(type) ? type : [type]

	for (const fileName of fileNames) {
		await setupRepositoryFile(fileName, filesRepository)
	}

	console.log('')

	await command.install()
}
