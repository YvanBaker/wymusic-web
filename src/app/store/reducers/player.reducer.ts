import {PlayMode} from '../../share/ui/player/player-type';
import { SongSheetList } from 'src/app/services/data-type/common.types';
import { createReducer, on } from '@ngrx/store';

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

const reducer = createReducer(initialState);
