import {Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {SongSheetList} from '../../../../services/data-type/common.types';
import {ScrollComponent} from '../scroll/scroll.component';
import {timer} from 'rxjs';
import {SongService} from '../../../../services/song.service';
import {BaseLyricLine, LyricC} from './lyric';

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
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onMusic = new EventEmitter<number>();
  @Output() clickClose = new EventEmitter<void>();

  scrollY = 0;

  currentLyric: BaseLyricLine[];

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
      this.songService.getSongLrc(this.currentSong.id).subscribe(res => {
        this.lyric = new LyricC(res);
        this.currentLyric = this.lyric.lines;
      });
    }

    if (changes.show) {
      if (this.show && !changes.show.firstChange) {
        this.scroll.first.refreshScroll();
        this.scroll.last.refreshScroll();
        timer(80).subscribe(() => {
          if (this.currentSong) {
            this.scrollToCurrent();
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
