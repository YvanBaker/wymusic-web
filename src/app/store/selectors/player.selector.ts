import {PlayState} from '../reducers/player.reducer';
import {createSelector} from '@ngrx/store';

const selectPlayerStates = (state: PlayState) => state;

export const getPlaying = createSelector(selectPlayerStates, (state: PlayState) => state.playing);
