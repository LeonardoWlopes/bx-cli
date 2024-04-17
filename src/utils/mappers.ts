import { EFunction } from '../enum/functions'
import { EServices } from '../enum/services'
import { generateNvmrc } from '../functions/generate-nvmrc'
import { configurationService } from '../services/configuration'
import { linterService } from '../services/linter'

export const SERVICE_MAPPER = {
	[EServices.CONFIG]: configurationService,
	[EServices.LINT]: linterService,
}

export const FUNCTIONS_MAPPER = {
	[EFunction.GENERATE_NVMRC]: generateNvmrc,
}
