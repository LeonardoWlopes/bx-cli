import inquirer from 'inquirer'
import { EConfigOptions, EStackOptions } from '../enums/options'
import { installDependencies } from './install-dependencies'
import { copyFiles } from './copy-files'
import chalk from 'chalk'

interface IConfigOptions {
	option: EConfigOptions
}

interface IStackOption {
	stack: EStackOptions
}

export async function configurationHandler() {
	const { option } = await inquirer.prompt<IConfigOptions>([
		{
			type: 'list',
			name: 'option',
			message: 'What do you want to configure?',
			choices: [EConfigOptions.ESLINT],
			default: EConfigOptions.ESLINT,
		},
	])

	switch (option) {
		case EConfigOptions.ESLINT:
			{
				const { stack } = await inquirer.prompt<IStackOption>([
					{
						type: 'list',
						name: 'stack',
						message: 'What stack do you want to use?',
						choices: Object.values(EStackOptions),
					},
				])

				await installDependencies(option)
				await copyFiles(option, stack)
			}
			break

		default:
			throw new Error('Invalid option')
	}

	console.log(chalk.green('✅ Configuration completed'))
}
