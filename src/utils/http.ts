import type { IConfigurationRequest } from '@/interfaces/config'

const filesResponse = await fetch(
	'https://api.github.com/gists/9119f15937d5ee8abae7414c853e6629',
)

export const filesRepository =
	(await filesResponse.json()) as IConfigurationRequest
