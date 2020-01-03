import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {SliderStyle} from './slider-typs';

@Component({
  selector: 'app-slider-track',
  template: `<div class="slider-track" [ngStyle]="style" [class.buffer]="buffer"></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderTrackComponent implements OnInit, OnChanges {

  @Input() vertical = false;
  @Input() buffer = false;
  @Input() length: number;

  style: SliderStyle = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.length) {
      if (this.vertical) {
        this.style.height = this.length + '%';
        this.style.left = null;
        this.style.width = null;
      } else {
        this.style.width = this.length + '%';
        this.style.bottom = null;
        this.style.height = null;
      }
    }
  }

}
