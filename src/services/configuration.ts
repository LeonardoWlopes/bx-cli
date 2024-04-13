import { EConfigType } from '@/enum/services'
import type { IConfigurationRequest } from '@/interfaces/config'
import { CONFIG_FILE_NAME_MAPPER } from '@/utils/mappers'
import inquirer from 'inquirer'

export async function configurationService() {
	const { type } = await inquirer.prompt<{
		type: EConfigType
	}>([
		{
			type: 'list',
			name: 'type',
			message: 'What linting tool do you want to use?',
			choices: Object.values(EConfigType).map((value) => ({
				name: value,
				value,
			})),
		},
	])

	const response = await fetch(
		'https://api.github.com/gists/9119f15937d5ee8abae7414c853e6629',
	)

	const data = (await response.json()) as IConfigurationRequest

	const configFile = data.files[CONFIG_FILE_NAME_MAPPER[type]]

	console.log(configFile)
}
