import {PlayMode} from '../../share/ui/player/player-type';
import { SongSheetList } from 'src/app/services/data-type/common.types';
import {Action, createReducer, on} from '@ngrx/store';
import {SetPlaying} from '../actions/player.actions';

export interface PlayState {
  playing: boolean;
  playMode: PlayMode;
  songList: SongSheetList[];
  playList: SongSheetList[];
  currentIndex: number;
}

export const initialState: PlayState = {
  playing: false,
  playMode: { type: 'loop', label: '循环'},
  songList: [],
  playList: [],
  currentIndex: -1
};

const reducer = createReducer(
  initialState,
  on(SetPlaying, (stare, { playing }) => ({ ...stare, playing })),
);

export function playerReducer(stare: PlayState, action: Action) {
  return reducer(stare, action);
}
