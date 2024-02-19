#!/usr/bin/env node
import chalk from 'chalk'
import { draw } from './utils/draw'
import { installDependencies } from './handlers/install-dependencies'
import { EArgs } from './enums/args'
import { args } from './utils/args'
import { copyFiles } from './handlers/copy-files'

async function bootstrap() {
	try {
		draw.header()

		if (args[EArgs.CONFIG]) {
			await installDependencies()
			await copyFiles()

			if (args[EArgs.WITH_BIOME]) {
				console.log(
					chalk.yellow('Config with biome is under development'),
				)
				process.exit(0)
			}

			console.log(chalk.green('✅ Default config created'))
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error(
			chalk.red('Ocorreu um erro:'),
			chalk.yellow(error?.message),
		)
	}
}

bootstrap()