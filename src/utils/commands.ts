import fs from 'node:fs'
import path from 'node:path'

const ECommandType = {
	NPM: 'npm',
	YARN: 'yarn',
	PNPM: 'pnpm',
}

async function getCommand() {
	const fileMatch = ['yarn.lock', 'pnpm-lock.yaml', 'package-lock.json']
	const commands = [ECommandType.YARN, ECommandType.PNPM, ECommandType.NPM]

	let command = ECommandType.NPM

	for (let i = 0; i < fileMatch.length; i++) {
		if (fs.existsSync(path.join('.', fileMatch[i]))) {
			command = commands[i]
			break
		}
	}

	return command
}

export async function command() {
	const command = await getCommand()

	function install() {
		console.log('install')
	}

	return {
		command,
		install,
	}
}
