import { exec as childExec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import util from 'node:util'
import { ECommandType } from '@/enum/command'
import chalk from 'chalk'
import ora from 'ora'

const execAsync = util.promisify(childExec)

class Command {
	private async getCommand(): Promise<ECommandType> {
		const fileMatch = [
			'yarn.lock',
			'pnpm-lock.yaml',
			'package-lock.json',
			'bun.lockb',
		]
		const commands = [
			ECommandType.YARN,
			ECommandType.PNPM,
			ECommandType.NPM,
			ECommandType.BUN,
		]

		for (let i = 0; i < fileMatch.length; i++) {
			if (fs.existsSync(path.join('.', fileMatch[i]))) {
				return commands[i]
			}
		}

		return ECommandType.NPM
	}

	private async exec(command: string) {
		try {
			const { stderr } = await execAsync(command)

			if (stderr) {
				console.error(stderr)
				return
			}
		} catch (error) {
			const err = error as Error
			console.error(`error: ${err.message}`)
		}
	}

	public async install() {
		const command = await this.getCommand()
		const spinner = ora(
			`installing dependencies using ${chalk.blue(command)} ...`,
		).start()

		try {
			await this.exec(`${command} install`)

			spinner.succeed('Installation completed successfully')
		} catch (error) {
			const err = error as Error
			spinner.fail(`Installation failed with error: ${err.message}`)
		}
	}

	public async getCommandType(): Promise<ECommandType> {
		const command = await this.getCommand()

		return command
	}
}

export const command = new Command()
