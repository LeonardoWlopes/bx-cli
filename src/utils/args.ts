import arg from 'arg'
import { EArgs } from '../enums/args'

export const args = arg({
	[EArgs.CONFIG]: Boolean,
    [EArgs.WITH_BIOME]: Boolean,
})
