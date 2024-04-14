import type { IConfigurationRequest } from '../interfaces/config'

export async function fetchFilesRepository(): Promise<IConfigurationRequest> {
	const filesResponse = await fetch(
		'https://api.github.com/gists/9119f15937d5ee8abae7414c853e6629',
	)

	const filesRepository =
		(await filesResponse.json()) as IConfigurationRequest

	return filesRepository
}
