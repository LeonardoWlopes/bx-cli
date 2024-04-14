export interface IConfigurationRequest {
	url: string
	forks_url: string
	commits_url: string
	id: string
	node_id: string
	git_pull_url: string
	git_push_url: string
	html_url: string
	files: Record<string, IFile>
	public: boolean
	created_at: string
	updated_at: string
	description: string
	comments: number
	user: null
	comments_url: string
	forks: null[]
	truncated: boolean
}

export interface IFile {
	filename: string
	type: string
	language: string
	raw_url: string
	size: number
	truncated: boolean
	content: string
}

export interface IFileContent {
	dependencies: Record<string, string>
	devDependencies: Record<string, string>
	fileName: string
	content: string
}
