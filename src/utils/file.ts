import chalk from 'chalk'
import fs from 'node:fs'

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
