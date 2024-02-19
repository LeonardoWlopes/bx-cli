import arg from 'arg'
import chalk from 'chalk'
import path from 'path'
import { exec } from 'child_process'
import util from 'util'
import fs from 'fs'
import { args } from '../utils/args'

export async function copyFiles() {
	if (args['--biome']) {
		console.log(chalk.yellow('Config with biome is under development'))
		process.exit(0)
	}

	const source = path.join(__dirname, '..', '..', 'templates')

	const files = fs.readdirSync(source)

	const existentFiles = files.filter((file) =>
		fs.existsSync(path.join(process.cwd(), file)),
	)

	if (existentFiles.length === files.length) {
		console.log(chalk.green('✅ Files already exist'))
		return
	}

	for (const file of files) {
		const sourceFile = path.join(source, file)
		const targetFile = path.join(process.cwd(), file)

		if (fs.existsSync(targetFile)) {
			continue
		}

		fs.copyFileSync(sourceFile, targetFile)
		//console.log(chalk.green(`File ${file} created`))
	}

	console.log(
		chalk.green(`✅ ${files.length - existentFiles.length} Files copied`),
	)
}
