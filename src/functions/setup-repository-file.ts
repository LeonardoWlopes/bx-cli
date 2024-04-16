import type { ERepositoryFileName } from '../enum/repository'
import type { IConfigurationRequest, IFileContent } from '../interfaces/config'
import { createFile } from '../utils/file'
import { packageJson } from '../utils/package'

export async function setupRepositoryFile(
	fileName: ERepositoryFileName,
	filesRepository: IConfigurationRequest,
) {
	const configFile = filesRepository.files?.[fileName]

	if (!configFile) {
		throw new Error(`No file found with the name ${fileName}`)
	}

	const fileContent = JSON.parse(configFile.content) as IFileContent

	packageJson.add({
		...fileContent,
	})

	createFile(fileContent.fileName, fileContent.content)
}
