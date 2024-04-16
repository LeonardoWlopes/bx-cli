import { EFunction } from '../enum/functions'
import { EServices } from '../enum/services'
import { generateNvmrc } from '../functions/generate-nvmrc'
import { configurationService } from '../services/configuration'

export const SERVICE_MAPPER = {
	[EServices.CONFIG]: configurationService,
}

export const FUNCTIONS_MAPPER = {
	[EFunction.GENERATE_NVMRC]: generateNvmrc,
}
