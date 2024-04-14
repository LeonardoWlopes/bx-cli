import { EConfigType, EServices } from '@/enum/services'
import { setupBiome } from '@/functions/setup-biome'
import { configurationService } from '@/services/configuration'

export const SERVICE_MAPPER = {
	[EServices.CONFIG]: configurationService,
}

export const FUNCTION_MAPPER = {
	[EConfigType.BIOME]: setupBiome,
	[EConfigType.ESLINT]: () => console.log('ESLint/Prettier'),
}

export const CONFIG_FILE_NAME_MAPPER = {
	[EConfigType.BIOME]: 'biome-config.json',
	[EConfigType.ESLINT]: 'eslint-config.json',
}
