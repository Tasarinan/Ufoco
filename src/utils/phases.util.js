import { Phases } from '../constants/AppSettings';

export const isImmersion = phase => phase === Phases.IMMERSION;
export const isShortBreak = phase => phase === Phases.SHORT_BREAK;
export const isLongBreak = phase => phase === Phases.LONG_BREAK;
