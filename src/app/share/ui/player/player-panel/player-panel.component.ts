import {Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {SongSheetList} from '../../../../services/data-type/common.types';
import {ScrollComponent} from '../scroll/scroll.component';
import {timer} from 'rxjs';
import {SongService} from '../../../../services/song.service';
import {LyricC, LyricLine} from './lyric';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.less']
})
export class PlayerPanelComponent implements OnInit, OnChanges {
  @Input() songList: SongSheetList[];
  @Input() currentSong: SongSheetList;
  @Input() songIndex: number;
  @Input() show: boolean;
  @Input() currentTime: number;
  @Input() duration: number;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onMusic = new EventEmitter<number>();
  @Output() clickClose = new EventEmitter<void>();

  scrollY = 0;

  currentLyric: LyricLine[];
  currentLyricIndex = 0;

  private lyric: LyricC;

  @ViewChildren(ScrollComponent) private scroll: QueryList<ScrollComponent>;
  constructor(private songService: SongService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.songList) {
      console.log('songList:', this.songList);
    }

    if (changes.currentSong) {
      this.resetLyric();
      this.currentLyricIndex = 0;
      this.scroll.first.refreshScroll();
      this.scroll.last.refreshScroll();
      this.songService.getSongLrc(this.currentSong.id).subscribe(res => {
        this.lyric = new LyricC(res);
        this.currentLyric = this.lyric.lines;
        timer(80).subscribe(() => {
            this.scrollToCurrentLyric(true);
        });
      });
    }

    if (changes.show) {
      if (this.show && !changes.show.firstChange) {
        this.scroll.first.refreshScroll();
        this.scroll.last.refreshScroll();
        timer(80).subscribe(() => {
          if (this.currentSong) {
            this.scrollToCurrent();
            this.scrollToCurrentLyric();
          }
        });
        /*setTimeout(() => {
          if (this.currentSong) {
            this.scrollToCurrent();
          }
        }, 80);*/
      }
    }

    if (changes.songIndex && this.show) {
      this.scrollToCurrent();
    }

    if (changes.currentTime && this.show && this.currentTime) {
      const index = this.currentLyric.findIndex(item => item.time / 1000 > this.currentTime ) - 1;
      if (index !== this.currentLyricIndex) {
        this.currentLyricIndex = index;
      }
      if (index < 4) {
        this.scrollToCurrentLyric(true);
      }
      this.scrollToCurrentLyric();
    }
  }

  // 滚动到当前正在播放的歌曲
  private scrollToCurrent() {
    const songListRefs = this.scroll.first.el.nativeElement.querySelectorAll('ul li');
    if (songListRefs.length) {
      const  currentLi = songListRefs[this.songIndex || 0] as HTMLElement;
      const offsetTop = currentLi.offsetTop;
      if (offsetTop - Math.abs(this.scrollY) > 242 || offsetTop - Math.abs(this.scrollY) < 0) {
        this.scroll.first.scrollToElement(currentLi, 300, false, false);
      }
    }
  }

  // 滚动到当前正在播放的歌词
  private scrollToCurrentLyric(n = false) {
    const lyricListRefs = this.scroll.last.el.nativeElement.querySelectorAll('ul li');
    if ( !n && lyricListRefs.length) {
      const currentLi = lyricListRefs[this.currentLyricIndex - 3 || 0] as HTMLElement;
      if ( this.currentLyricIndex / 4 !== 0) {
        this.scroll.last.scrollToElement(currentLi, 300, false, false);
      }
    } else {
      const currentLi = lyricListRefs[0] as HTMLElement;
      this.scroll.last.scrollToElement(currentLi, 300, false, false);
    }
  }

  // 获取歌手
  getSingers(item: SongSheetList): string {
    let singers = '';
    let s = 1;
    item.ar.forEach(singer => {
      if (item.ar.length !== s) {
        singers += singer.name + '/';
        s++;
      } else {
        singers += singer.name;
      }
    });
    return singers;
  }

  // 当前索引值
  pushIndex(index: number) {
    this.onMusic.emit(index);
  }

  // 重置 Lyric
  private resetLyric() {
    if (this.lyric) {
      this.lyric = null;
      this.currentLyric = [];
    }
  }
}
