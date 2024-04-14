import fs from 'node:fs'
import path from 'node:path'
import { ECommandType } from '@/enum/command'
import type { IDependencies, IPackageJson } from '@/interfaces/package'

class Package {
	private pkg: IPackageJson
	private targetPkg: IPackageJson

	constructor() {
		this.pkg = this.loadPackageJson(
			path.join(__dirname, '../../package.json'),
		)
		this.targetPkg = this.loadPackageJson(
			path.join(process.cwd(), 'package.json'),
		)
	}

	private loadPackageJson(filePath: string): IPackageJson {
		if (fs.existsSync(filePath)) {
			return require(filePath)
		}

		throw new Error(`package.json file not found at ${filePath}`)
	}

	public savePackage(packageData: IPackageJson): void {
		const targetPkgPath = path.join(process.cwd(), 'package.json')
		fs.writeFileSync(targetPkgPath, JSON.stringify(packageData, null, 2))
	}

	public addDependenciesToPackage(
		dependencies: IDependencies,
		devDependencies: IDependencies,
	): void {
		this.targetPkg.dependencies = {
			...this.targetPkg.dependencies,
			...dependencies,
		}
		this.targetPkg.devDependencies = {
			...this.targetPkg.devDependencies,
			...devDependencies,
		}
		this.savePackage(this.targetPkg)
	}

	public getPackage(): IPackageJson {
		return this.pkg
	}

	public getTargetPackage(): IPackageJson {
		return this.targetPkg
	}
}

class PackageManager {
	private command: ECommandType

	constructor() {
		this.command = this.getCommand()
	}

	private getCommand(): ECommandType {
		const fileMatch = ['yarn.lock', 'pnpm-lock.yaml', 'package-lock.json']
		const commands = [
			ECommandType.YARN,
			ECommandType.PNPM,
			ECommandType.NPM,
		]

		for (let i = 0; i < fileMatch.length; i++) {
			if (fs.existsSync(path.join('.', fileMatch[i]))) {
				return commands[i]
			}
		}

		return ECommandType.NPM
	}
}

const packageManager = new PackageManager()
const packageHandler = new Package()

export { packageHandler, packageManager }
