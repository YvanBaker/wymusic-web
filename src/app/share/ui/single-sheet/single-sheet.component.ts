import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HotSongSheet} from '../../../services/data-type/common.types';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less']
})
export class SingleSheetComponent implements OnInit {

  @Input() sheet: HotSongSheet;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPlay = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  pushId(id: number) {
    this.onPlay.emit(id);
  }
}
