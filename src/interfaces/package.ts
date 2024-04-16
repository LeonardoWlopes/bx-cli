export type IPackageJson = typeof import('../../package.json')

type IPackageParam = { [key: string]: string }

export interface IAddToPackage {
	dependencies?: IPackageParam
	devDependencies?: IPackageParam
	scripts?: IPackageParam
}
