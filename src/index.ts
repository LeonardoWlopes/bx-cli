#!/usr/bin/env node
import { EServices } from '@/enum/services'
import { SERVICE_LABEL } from '@/utils/labels'
import { SERVICE_MAPPER } from '@/utils/mappers'
import chalk from 'chalk'
import inquirer from 'inquirer'

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
