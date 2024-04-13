import { EConfigType, EServices } from '../enum/services'
import { configurationService } from '../services/configuration'

export const SERVICE_MAPPER = {
	[EServices.CONFIG]: configurationService,
}

export const CONFIG_FILE_NAME_MAPPER = {
	[EConfigType.BIOME]: 'biome-config.json',
	[EConfigType.ESLINT]: 'eslint-config.json',
}
