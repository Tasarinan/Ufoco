import { isMacOS } from './platform.util';

import { currentPhase as getCurrentPhase } from '../selectors/rounds.selectors';
import {
  library as getSoundLibrary,
  soundImmersionPhase as getImmersionSound,
  soundShortBreakPhase as getShortBreakSound,
  soundLongBreakPhase as getLongBreakSound,
} from '../selectors/sounds.selectors';

import { Phases, Sounds } from '../constants/AppSettings';
import{ ElectronSettingsPaths } from '../constants/ElectronSettings';

export const createAudioTag = ({ id, src, title, soundType }) => {
  const audio = new Audio(src);
  audio.id = id;
  audio.title = title;
  audio.soundType = soundType;
  return audio;
};

export const getCurrentSound = (state) => {
  const currentPhase = getCurrentPhase(state);

  switch (currentPhase) {
    case Phases.IMMERSION: {
      return getImmersionSound(state);
    }
    case Phases.LONG_BREAK: {
      return getLongBreakSound(state);
    }
    case Phases.SHORT_BREAK: {
      return getShortBreakSound(state);
    }
    default: {
      return getImmersionSound(state);
    }
  }
};

export const getDefaultSound = (state) => {
  const currentPhase = getCurrentPhase(state);

  switch (currentPhase) {
    case Phases.IMMERSION: {
      return {
        key: ElectronSettingsPaths.IMMERSION_SOUND,
        id: Sounds.TICK,
      };
    }
    case Phases.LONG_BREAK: {
      return {
        key: ElectronSettingsPaths.LONG_BREAK_SOUND,
        id: Sounds.TICK,
      };
    }
    case Phases.SHORT_BREAK: {
      return {
        key: ElectronSettingsPaths.SHORT_BREAK_SOUND,
        id: Sounds.TICK,
      };
    }
    default: {
      return {
        key: ElectronSettingsPaths.IMMERSION_SOUND,
        id: Sounds.TICK,
      };
    }
  }
};

export const getTitleFromSrc = (src) => {
  const split = isMacOS() ? src.split('/') : src.split('\\');
  const last = split.length - 1;
  const title = split[last];
  return title;
};

export const pauseAllSounds = state => {
  const library = getSoundLibrary(state);
  library.forEach(sound => sound.pause());
};
