import fs from 'node:fs'

export function createFile(fileName: string, content: string | object) {
	const data =
		typeof content === 'object' ? JSON.stringify(content, null, 2) : content

	fs.writeFile(fileName, data, (err) => {
		if (err) {
			console.error(`Error creating file: ${err}`)
		}
	})
}
