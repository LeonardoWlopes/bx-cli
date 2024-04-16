import type { ERepositoryFileName } from '../enum/repository'
import type { IFileContent } from '../interfaces/config'
import { createFile } from '../utils/file'
import { fetchFilesRepository } from '../utils/http'
import { packageJson } from '../utils/package'

export async function setupRepositoryFile(fileName: ERepositoryFileName) {
	const filesRepository = await fetchFilesRepository()

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
