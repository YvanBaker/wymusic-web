import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {SliderStyle} from './slider-typs';

@Component({
  selector: 'app-slider-handle',
  template: `<div class="slider-handle" [ngStyle]="style"></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderHandleComponent implements OnInit, OnChanges {

  @Input() vertical = false;
  @Input() offset: number;

  style: SliderStyle = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.offset) {
      this.style[this.vertical ? 'bottom' : 'left'] = this.offset + '%';
    }
  }

}
