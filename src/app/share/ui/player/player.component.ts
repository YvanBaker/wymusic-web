import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentIndex, getCurrentSong, getPlayList, getPlayMode, getSongList} from '../../../store/selectors/player.selector';
import {SongSheetList} from '../../../services/data-type/common.types';
import {PlayMode} from './player-type';
import {SetCurrentIndex} from '../../../store/actions/player.actions';




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
  playing =  false;
  songReady = false;

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
    console.log(song);
  }

  get picUrl(): string {
    return this.song ? this.song.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg';
  }

  onCanPlay() {
    this.songReady = true;
    this.playing = true;
    this.play();
  }

  private play() {
    this.audioEl.play();
  }

  onToggle() {
    if ( this.songReady ) {
      this.playing = !this.playing;
      if (this.playing) {
        this.audioEl.play();
      } else {
        this.audioEl.pause();
      }
    }
    return;
  }

  // 上一首
  onPrev(index: number) {
    if (this.songReady) {
      if (this.playList.length === 1) {
        this.audioEl.pause();
      } else {
        const newIndex = index < 0 ? this.playList.length - 1 : index;
        this.updateIndex(newIndex);
      }
    }
    return;
  }

  // 下一首
  onNext(index: number) {
    if (this.songReady) {
      if (this.playList.length === 1) {
        this.audioEl.pause();
      } else {
        const newIndex = index > this.playList.length ? 0 : index;
        this.updateIndex(newIndex);
      }
    }
    return;
  }

  private updateIndex(newIndex: number) {
    this.playing = false;
    this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
    this.songReady = false;
  }

  // 播放结束
  onEnded() {
    this.playing = false;
    if (this.mode.type === 'singleLoop') {
      this.audioEl.loop = true;
    } else {
      this.onNext(this.currentIndex + 1);
    }
  }
}
