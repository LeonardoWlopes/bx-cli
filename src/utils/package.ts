import fs from 'node:fs'
import path from 'node:path'
import type { IAddToPackage, IPackageJson } from '../interfaces/package'

class Package {
	private targetPkg: IPackageJson

	constructor() {
		this.targetPkg = this.load(path.join(process.cwd(), 'package.json'))
	}

	private load(filePath: string): IPackageJson {
		if (fs.existsSync(filePath)) {
			return require(filePath)
		}

		throw new Error(`package.json file not found at ${filePath}`)
	}

	public save(packageData: IPackageJson): void {
		const targetPkgPath = path.join(process.cwd(), 'package.json')
		fs.writeFileSync(targetPkgPath, JSON.stringify(packageData, null, 2))
	}

	public add({
		dependencies,
		devDependencies,
		scripts,
	}: IAddToPackage): void {
		this.targetPkg.dependencies = {
			...this.targetPkg.dependencies,
			...dependencies,
		}

		this.targetPkg.devDependencies = {
			...this.targetPkg.devDependencies,
			...devDependencies,
		}

		this.targetPkg.scripts = {
			...this.targetPkg.scripts,
			...scripts,
		}

		this.save(this.targetPkg)
	}

	public get(): IPackageJson {
		return this.targetPkg
	}
}

const packageJson = new Package()

export { packageJson }
