import { createAction, props } from '@ngrx/store';
import {SongSheetList} from '../../services/data-type/common.types';
import {PlayMode} from '../../share/ui/player/player-type';

export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetSongList = createAction('[player] Set songList', props<{ songList: SongSheetList[] }>());
export const SetPlayList = createAction('[player] Set playList', props<{ playList: SongSheetList[] }>());
export const SetPlayMode = createAction('[player] Set playMode', props<{ playMode: PlayMode }>());
export const SetCurrentIndex = createAction('[player] Set currentIndex', props<{ currentIndex: number }>());

