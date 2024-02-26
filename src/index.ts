#!/usr/bin/env node
import chalk from 'chalk'
import { draw } from './utils/draw'
import inquirer from 'inquirer'
import { EFunctions } from './enums/options'
import { configurationHandler } from './handlers/configuration-handler'

interface IOptions {
	option: EFunctions
}

async function bootstrap() {
	try {
		draw.header()

		const { option } = await inquirer.prompt<IOptions>([
			{
				type: 'list',
				name: 'option',
				message: 'What do you want to do?',
				choices: [EFunctions.CONFIG],
			},
		])

		switch (option) {
			case EFunctions.CONFIG:
				configurationHandler()
				break
		}
	} catch (error) {
		const err = error as Error

		console.error(chalk.red('Error:'), err.message)
		draw.usage()
		process.exit(1)
	}
}

bootstrap()
