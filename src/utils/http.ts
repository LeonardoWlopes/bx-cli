import chalk from 'chalk'
import ora from 'ora'
import type { IConfigurationRequest } from '../interfaces/config'

export async function fetchFilesRepository(): Promise<IConfigurationRequest> {
	const spinner = ora('Loading repository files...').start()

	try {
		const filesResponse = await fetch(
			'https://api.github.com/gists/9119f15937d5ee8abae7414c853e6629',
		)

		const filesRepository =
			(await filesResponse.json()) as IConfigurationRequest

		spinner.succeed(
			`Repository files loaded ${chalk.green('successfully')}`,
		)

		return filesRepository
	} catch (error) {
		spinner.fail('Failed to load repository files.')
		throw error
	}
}
