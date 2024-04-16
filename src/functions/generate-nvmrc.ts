import { createFile } from '../utils/file'

export function generateNvmrc() {
	const fileName = '.nvmrc'

	const content = process.version.slice(1)

	createFile(fileName, content)
}
