import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'

export function createFile(fileName: string, content: string | object) {
	const data =
		typeof content === 'object' ? JSON.stringify(content, null, 2) : content

	const fileExists = fs.existsSync(fileName)

	fs.writeFile(fileName, data, (err) => {
		if (err) {
			console.error(
				chalk.red(`❌ Error creating ${chalk.blue(fileName)}: ${err}`),
			)
		}
	})

	if (fileExists) {
		console.log(chalk.green(`🪛 Updated ${chalk.blue(fileName)}`))
		return
	}

	console.log(chalk.green(`✅ Created ${chalk.blue(fileName)}`))
}

export function readFile(fileName: string): string {
	return fs.readFileSync(fileName, 'utf-8')
}

export function fileExists(fileName: string): boolean {
	return fs.existsSync(path.join(process.cwd(), fileName))
}
