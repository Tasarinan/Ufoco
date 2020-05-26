import { Phases } from "../constants/enums";

export const isImmersion = (phase) => phase === Phases.IMMERSION;
export const isShortBreak = (phase) => phase === Phases.SHORT_BREAK;
export const isLongBreak = (phase) => phase === Phases.LONG_BREAK;
