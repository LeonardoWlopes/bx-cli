import fs from 'node:fs'
import path from 'node:path'
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

const packageHandler = new Package()

export { packageHandler }
