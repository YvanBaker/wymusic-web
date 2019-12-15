import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentIndex, getCurrentSong, getPlayList, getPlayMode, getSongList} from '../../../store/selectors/player.selector';
import {SongSheetList} from '../../../services/data-type/common.types';
import {PlayMode} from './player-type';




@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {
  songList: SongSheetList[];
  playList: SongSheetList[];
  currentIndex: number;
  mode: PlayMode;
  song: SongSheetList;

  @ViewChild('audioEl', {static: true}) private audio: ElementRef;
  private audioEl: HTMLAudioElement;

  constructor(private store$: Store<{ player }>) {
    const appStore$ = this.store$.pipe(select('player'));
    appStore$.pipe(select(getSongList)).subscribe( list => {
      this.watchList(list, 'songList');
    });
    appStore$.pipe(select(getPlayList)).subscribe( list => {
      this.watchList(list, 'playList');
    });
    appStore$.pipe(select(getCurrentIndex)).subscribe( index => {
      this.watchCurrentIndex(index);
    });
    appStore$.pipe(select(getPlayMode)).subscribe( mode => {
      this.watchPlaMode(mode);
    });
    appStore$.pipe(select(getCurrentSong)).subscribe( song => {
      this.watchCurrentSong(song);
    });
  }

  ngOnInit() {
    this.audioEl = this.audio.nativeElement;
  }

  private watchList(list: SongSheetList[], type: string) {
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  private watchPlaMode(mode: PlayMode) {
    console.log(mode);
    this.mode = mode;
  }

  private watchCurrentSong(song: SongSheetList) {
    this.song = song;
  }

  onCanPlay() {
    this.play();
  }

  private play() {
    this.audioEl.play();
  }
}
