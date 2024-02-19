import path from 'path'
import fs from 'fs'

let pkg: typeof import('../../package.json')
let targetPkg: typeof import('../../package.json')

try {
	const pkgPath = path.join(__dirname, '../../package.json')
	if (fs.existsSync(pkgPath)) {
		pkg = require(pkgPath)
	} else {
		throw new Error('Arquivo package.json não encontrado')
	}

	const targetPkgPath = path.join(process.cwd(), 'package.json')
	if (fs.existsSync(targetPkgPath)) {
		targetPkg = require(targetPkgPath)
	} else {
		throw new Error('Arquivo package.json de destino não encontrado')
	}
} catch (err) {
	console.error(err)
	process.exit(1)
}

export { pkg, targetPkg }
