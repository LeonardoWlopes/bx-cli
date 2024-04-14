import type { ERepositoryFileName } from '@/enum/repository'
import type { IFileContent } from '@/interfaces/config'
import { createFile } from '@/utils/file'
import { filesRepository } from '@/utils/http'
import { packageHandler } from '@/utils/package'

export async function setupRepositoryFile(fileName: ERepositoryFileName) {
	const configFile = filesRepository.files?.[fileName]

	if (!configFile) {
		throw new Error(`No file found with the name ${fileName}`)
	}

	const fileContent = JSON.parse(configFile.content) as IFileContent

	packageHandler.addDependenciesToPackage(
		fileContent.dependencies,
		fileContent.devDependencies,
	)

	createFile(fileContent.fileName, fileContent.content)
}
