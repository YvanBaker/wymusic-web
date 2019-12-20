import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SongSheetList} from '../../../../services/data-type/common.types';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.less']
})
export class PlayerPanelComponent implements OnInit, OnChanges {
  @Input() songList: SongSheetList[];
  @Input() currentSong: SongSheetList;

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

}
