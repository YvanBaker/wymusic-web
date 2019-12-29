import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentIndex, getCurrentSong, getPlayList, getPlayMode, getSongList} from '../../../store/selectors/player.selector';
import {SongSheetList} from '../../../services/data-type/common.types';
import {PlayMode} from './player-type';
import {SetCurrentIndex, SetPlayList, SetPlayMode} from '../../../store/actions/player.actions';
import {shuffle} from '../../../utils/array';

const modeTypes: PlayMode[] = [{
  type: 'loop',
  label: '循环'
}, {
  type: 'random',
  label: '随机'
}, {
  type: 'singleLoop',
  label: '单曲循环'
}];


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {
  songList: SongSheetList[];
  playList: SongSheetList[];
  currentIndex: number;
  songIndex = 0;
  currentMode: PlayMode;
  modeCount = 0;
  song: SongSheetList;
  playing =  false;
  songReady = false;
  show = false;

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
    this.store$.pipe(select('player')).pipe(select(getPlayMode)).subscribe( mode => {
      if (mode.type === 'random') {
        if (this.song) {
          this.songIndex = this.playList.findIndex(item => item.id === this.song.id);
        } else {
          this.songIndex = 0;
        }
      } else {
        this.songIndex = index;
      }
    });
  }

  private watchPlaMode(mode: PlayMode) {
    this.currentMode = mode;
    if (this.songList) {
      let list = this.songList.slice();
      if ( mode.type === 'random' ) {
        list = shuffle(this.songList);
      }
      this.updateCurrentIndex(list, this.song);
      this.store$.dispatch(SetPlayList({playList: list}));
    }
  }

  private watchCurrentSong(song: SongSheetList) {
    this.song = song;
  }

  // 获取歌曲图片Url
  get picUrl(): string {
    return this.song ? this.song.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg';
  }

  // 点击卡片播放按钮
  onCanPlay() {
    this.songReady = true;
    this.playing = true;
    this.play();
  }

  // 音乐播放
  private play() {
    this.audioEl.play();
  }

  // 单曲循环
  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

  // 点击播放暂停按钮时
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
        this.loop();
      } else {
        const newIndex = index < 0 ? this.playList.length - 1 : index;
        this.updateIndex(newIndex);
        this.songIndex = this.songList.findIndex(item => item.id === this.song.id);
      }
    }
    return;
  }

  // 下一首
  onNext(index: number) {
    if (this.songReady) {
      if (this.playList.length === 1) {
        this.loop();
      } else {
        const newIndex = index > this.playList.length - 1 ? 0 : index;
        this.updateIndex(newIndex);
        this.songIndex = this.songList.findIndex(item => item.id === this.song.id);
      }
    }
    return;
  }

  // 更新索引值
  private updateIndex(newIndex: number) {
    this.playing = false;
    this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
    this.songReady = false;
  }

  // 播放结束
  onEnded() {
    this.playing = false;
    if (this.currentMode.type === 'singleLoop') {
      this.loop();
    } else {
      this.onNext(this.currentIndex + 1);
    }
  }

  // 改变播放模式
  changeMode() {
    const temp = modeTypes[++this.modeCount % 3];
    this.store$.dispatch(SetPlayMode({ playMode: temp }));
  }

  // 点击播放列表某一首歌曲播放
  onPlayList(index: number) {
    if (this.songReady) {
      if (this.currentMode.type === 'random') {
        const newIndex = this.playList.findIndex(item => item.id === this.songList[index].id);
        if (newIndex === this.currentIndex) {
          this.loop();
        } else {
          this.updateIndex(newIndex);
          this.songIndex = index;
        }
      } else {
        if (this.currentIndex === index) {
          this.loop();
        } else {
          this.updateIndex(index);
        }
      }
    }
    return;
  }

  // 点击播放列表图标是
  onOpen() {
    this.show = !this.show;
  }

  // 随机播放是更改索引值
  private updateCurrentIndex(list: SongSheetList[], song: SongSheetList) {
    const newIndex = list.findIndex(item => item.id === song.id);
    this.store$.dispatch(SetCurrentIndex({currentIndex: newIndex}));
  }
}
