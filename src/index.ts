#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import { SERVICE_LABEL } from './utils/labels'
import { SERVICE_MAPPER } from './utils/mappers'
import { EServices } from './enum/services'

async function main() {
	console.clear()

	console.log(chalk.blue('Hello Builder!\n'))

	const { option } = await inquirer.prompt<{
		option: EServices
	}>([
		{
			type: 'list',
			name: 'option',
			message: 'What do you wanna to do?',
			choices: Object.values(EServices).map((value) => ({
				name: SERVICE_LABEL[value],
				value,
			})),
		},
	])

	SERVICE_MAPPER[option]()
}

main()
