import { EServices } from '../enum/services'
import { configurationService } from '../services/configuration'

export const SERVICE_MAPPER = {
	[EServices.CONFIG]: configurationService,
}
