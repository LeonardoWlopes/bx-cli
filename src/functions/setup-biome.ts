import { EConfigType } from '@/enum/services'
import type { IConfigurationRequest, IFileContent } from '@/interfaces/config'
import { command } from '@/utils/commands'
import { createFile } from '@/utils/file'
import { CONFIG_FILE_NAME_MAPPER } from '@/utils/mappers'
import { packageHandler } from '@/utils/package'
import chalk from 'chalk'

export async function setupBiome() {
	const response = await fetch(
		'https://api.github.com/gists/9119f15937d5ee8abae7414c853e6629',
	)

	const data = (await response.json()) as IConfigurationRequest

	const configFile = data.files[CONFIG_FILE_NAME_MAPPER[EConfigType.BIOME]]

	const fileContent = JSON.parse(configFile.content) as IFileContent

	packageHandler.addDependenciesToPackage(
		fileContent.dependencies,
		fileContent.devDependencies,
	)

	createFile(fileContent.fileName, fileContent.content)

	await command.install()

	console.log(`${chalk.blue('Biome')} has been setup successfully!`)
}
