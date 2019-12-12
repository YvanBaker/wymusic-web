import { createAction, props } from '@ngrx/store';

export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());

