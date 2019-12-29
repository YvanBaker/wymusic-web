import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SongSheetList} from '../../../../services/data-type/common.types';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.less']
})
export class PlayerPanelComponent implements OnInit, OnChanges {
  @Input() songList: SongSheetList[];
  @Input() currentSong: SongSheetList;
  @Input() currentIndex: number;
  @Input() show: boolean;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onMusis = new EventEmitter<number>();
  @Output() clickClose = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.songList) {
      console.log('songList:', this.songList);
    }
    if (changes.currentSong) {
      console.log('currentSong:', this.currentSong);
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

  pushIndex(index: number) {
    this.onMusis.emit(index);
  }

}
