#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import { EServices } from './enum/services'
import { SERVICE_LABEL } from './utils/labels'
import { SERVICE_MAPPER } from './utils/mappers'

async function run() {
	console.clear()

	console.log(chalk.blue('Hello Builder!\n'))

	const { option } = await inquirer.prompt<{
		option: EServices
	}>([
		{
			type: 'list',
			name: 'option',
			message: 'What do you wanna do?',
			choices: Object.values(EServices).map((value) => ({
				name: SERVICE_LABEL[value],
				value,
			})),
		},
	])

	SERVICE_MAPPER[option]()
}

run()
