import { EConfigType } from '@/enum/services'
import { FUNCTION_MAPPER } from '@/utils/mappers'
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

	FUNCTION_MAPPER[type]()
}
