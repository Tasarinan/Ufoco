import { Phases } from '../constants/AppSettings';

export const getPhaseTime = (iwl, lbl, sbl, cp) => {
  if (cp === Phases.IMMERSION) return iwl;
  if (cp === Phases.SHORT_BREAK) return sbl;
  if (cp === Phases.LONG_BREAK) return lbl;
  return 0;
};

export const hasReachedEnd = (currentPhase, currentRound, timer, totalRounds) => (
  currentRound >= totalRounds &&
  currentPhase >= 0 &&
  timer <= 0
);

export const hasReachedLastRound = (currentPhase, currentRound, totalRounds) => (
  currentRound >= totalRounds && currentPhase >= 0
);

export const twoDigits = (n) => {
  if (n < 10) return `0${n}`;
  return n;
};

export const getClockTime = duration => {
  // Get hours from milliseconds
  const hours = duration / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);

  // Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);

  // Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.round(seconds);

  return {
    hours: absoluteHours,
    minutes: absoluteMinutes,
    seconds: absoluteSeconds,
  };
};

