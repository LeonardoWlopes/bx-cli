import { EConfigType, EServices } from '@/enum/services'

export const SERVICE_LABEL = {
	[EServices.CONFIG]: 'Configure my project',
}

export const CONFIG_LABEL = {
	[EConfigType.ESLINT]: 'ESLint/Prettier',
	[EConfigType.BIOME]: 'Biome',
}
