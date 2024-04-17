import { createFile, readFile } from '../utils/file'

export async function generateTsPaths() {
	const tsconfig = JSON.parse(readFile('tsconfig.json'))

	tsconfig.compilerOptions.paths = { '@/*': ['./src/*'] }

	createFile('tsconfig.json', tsconfig)
}
