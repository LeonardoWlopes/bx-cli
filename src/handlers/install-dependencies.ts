import { targetPkg } from '../utils/package'
import chalk from 'chalk'
import { EConfigOptions } from '../enums/options'
const { exec } = require('child_process')

const util = require('util')
const fs = require('fs')

const ESLINT_DEPENDENCIES = [
	'@rocketseat/eslint-config',
	'@typescript-eslint/eslint-plugin',
	'@typescript-eslint/parser',
	'eslint',
	'eslint-plugin-react-hooks',
	'eslint-plugin-unused-imports',
	'prettier',
	'typescript',
]

const execAsync = util.promisify(exec)

export async function installDependencies(option: EConfigOptions) {
	switch (option) {
		case EConfigOptions.ESLINT:
			{
				const installedDependencies = new Set(
					Object.keys(targetPkg.devDependencies || {}),
				)

				const missingDependencies = ESLINT_DEPENDENCIES.filter(
					(dep) => !installedDependencies.has(dep),
				)

				if (missingDependencies.length > 0) {
					const commandParam = missingDependencies.join(' ')

					console.log(chalk.yellow('Installing dependencies...'))

					try {
						await execAsync(
							`npm install ${commandParam} --save-dev`,
						)
					} catch (error) {
						throw new Error('Error installing dependencies')
					}

					console.log(
						chalk.green(
							`✅ ${missingDependencies.length} Dependencies installed`,
						),
					)
				} else {
					console.log(
						chalk.green(
							'✅ All dependencies are already installed',
						),
					)
				}
			}

			break

		default:
			break
	}
}
