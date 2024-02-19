import chalk from "chalk"
import { pkg } from "./package"

export const draw = {
	header: () => {
		console.log(`Bx-CLI version: ${pkg.version}\n`)
	},
	usage: () => {
		console.log(`${chalk.whiteBright('tool [CMD]')}
    ${chalk.greenBright('--start')}\tStarts the app
    ${chalk.greenBright('--build')}\tBuilds the app`)
	},
}
