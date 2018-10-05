import { createSelector } from 'reselect';

import { mediaControls } from './common.selectors';

export const isPlaying = createSelector(
  mediaControls,
  r => r.isPlaying
);

export const isStopped = createSelector(
  mediaControls,
  r => r.isStopped
);
