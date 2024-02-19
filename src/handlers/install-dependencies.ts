import arg from 'arg'
import { targetPkg } from '../utils/package'
import { EArgs } from '../enums/args'
import { args } from '../utils/args'
import chalk from 'chalk'
import { draw } from '../utils/draw'
const { exec } = require('child_process')

const util = require('util')
const fs = require('fs')

const execAsync = util.promisify(exec)

export async function installDependencies() {
	if (args[EArgs.WITH_BIOME]) {
		console.log(chalk.yellow('Config with biome is under development'))
		process.exit(0)
	}

	const DEPENDENCIES_TO_CHECK = [
		'@rocketseat/eslint-config',
		'@typescript-eslint/eslint-plugin',
		'@typescript-eslint/parser',
		'eslint',
		'eslint-plugin-react-hooks',
		'eslint-plugin-unused-imports',
		'prettier',
		'typescript',
	]

	const installedDependencies = new Set(
		Object.keys(targetPkg.devDependencies || {}),
	)

	const missingDependencies = DEPENDENCIES_TO_CHECK.filter(
		(dep) => !installedDependencies.has(dep),
	)

	let installingDependenceIndex = -1

	function printDependencies() {
		console.clear()
		draw.header()
		console.log('Installing dependencies...\n')

		DEPENDENCIES_TO_CHECK.forEach((dep, index) => {
			if (installedDependencies.has(dep)) {
				console.log(`✅ ${chalk.green(dep)}`)
				return
			}

			if (index === installingDependenceIndex) {
				console.log(`${chalk.yellow(dep)} (installing...)`)
				return
			}

			console.log(chalk.red(dep))
		})
	}

	if (missingDependencies.length > 0) {
		for (const dep of missingDependencies) {
			const depIndex = DEPENDENCIES_TO_CHECK.indexOf(dep)

			installingDependenceIndex = depIndex

			try {
				printDependencies()
				await execAsync(`npm install ${dep} --save-dev`)
				installedDependencies.add(dep)
			} catch (error) {
				throw new Error(`Error installing ${dep}`)
			} finally {
				installingDependenceIndex = -1
				printDependencies()
			}
		}
	} 
		console.log(chalk.green('✅ All dependencies are already installed'))
	
}
