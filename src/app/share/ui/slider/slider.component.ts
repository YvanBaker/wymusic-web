import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SliderEventObserverConfig, SliderValue} from './slider-typs';
import {fromEvent, merge, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, pluck, takeUntil, tap} from 'rxjs/operators';
import {getElementOffset, sliderEvent} from './slider-helper';
import {DOCUMENT} from '@angular/common';
import {getPercent, limitNumberInRange} from '../../../utils/number';
import {inArray} from '../../../utils/array';
import {SongSheetList} from '../../../services/data-type/common.types';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
  }]
})
export class SliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() song: SongSheetList;
  @Input() vertical = false;
  @Input() bufferOffset = 0;
  @Input() min = 0;
  @Input() max = 100;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAfterChange = new EventEmitter<SliderValue>();


  private sliderDome: HTMLDivElement;
  @ViewChild('slider', { static: true }) private slider: ElementRef;

  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;
  private unDragStart$: Subscription | null;
  private unDragMove$: Subscription | null;
  private unDragEnd$: Subscription | null;

  private isDragging = false;

  value: SliderValue = null;
  offset: SliderValue = null;

  constructor(@Inject(DOCUMENT) private doc: Document, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.sliderDome = this.slider.nativeElement;
    this.createDraggngObservables();
    this.subscribeDrag(['start']);
  }

/*  ngOnChanges(changes: SimpleChanges): void {
    if (changes.song) {
      if (this.song || this.vertical) {
        console.log(this.song);
        console.log(this.vertical);
        this.value = 0;
        this.sliderDome = this.slider.nativeElement;
        this.createDraggngObservables();
        this.subscribeDrag(['start']);
      }
    }
  }*/

  private createDraggngObservables() {
    const orientField = this.vertical ? 'pageY' : 'pageX';

    const mouse: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField]
    };

    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touch', '0', orientField],
    };

    [mouse, touch].forEach(source => {
      const {start, move, end, filter: filerFunc, pluckKey} = source;

      source.startPlucked$ = fromEvent(this.sliderDome, start).pipe(
          filter(filerFunc),
          tap(sliderEvent),
          pluck(...pluckKey),
          map((position: number) => this.findClosestValue(position))
        );
      source.end$ = fromEvent(this.doc, end);
      source.moveResolved$ = fromEvent(this.doc, move).pipe(
        filter(filerFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findClosestValue(position)),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$ && !this.unDragStart$) {
      this.unDragStart$ = this.dragStart$.subscribe(this.onDragStar.bind(this));
    }
    if (inArray(events, 'move') && this.dragStart$ && !this.unDragMove$) {
      this.unDragMove$ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.dragStart$ && !this.unDragEnd$) {
      this.unDragEnd$ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.unDragStart$) {
      this.unDragStart$.unsubscribe();
      this.unDragStart$ = null;
    }
    if (inArray(events, 'move') && this.unDragMove$) {
      this.unDragMove$.unsubscribe();
      this.unDragMove$ = null;
    }
    if (inArray(events, 'end') && this.unDragEnd$) {
      this.unDragEnd$.unsubscribe();
      this.unDragEnd$ = null;
    }
  }

  private onDragStar(value: number) {
    this.togglerDargMoving(true);
    this.setValue(value);
  }

  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value);
      this.cdr.markForCheck();
    }
  }

  private onDragEnd() {
    this.onAfterChange.emit(this.value);
    this.togglerDargMoving(false);
    this.cdr.markForCheck();
  }

  private setValue(value: SliderValue, needCheck = false) {
    if (needCheck) {
      if (this.isDragging) { return ; }
      this.value = this.fromatValue(value);
      this.updateTrackAndHandles();
    } else {
      if (!this.valuesEqual(this.value, value)) {
        this.value = value;
        this.updateTrackAndHandles();
        this.onValueChange(this.value);
      }
    }
  }

  private fromatValue(value: SliderValue): SliderValue {
    let res = value;
    if (this.assertValueValid(value)) {
      res = this.min;
    } else {
      res = limitNumberInRange(value, this.min, this.max);
    }
    return res;
  }

  assertValueValid(value: SliderValue): boolean {
    return isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private updateTrackAndHandles() {
    this.offset = this.getValueToOffset(this.value);
    this.cdr.markForCheck();
  }

  private togglerDargMoving(movable: boolean) {
    this.isDragging = movable;
    if (movable) {
      this.subscribeDrag(['move', 'end']);
    } else {
      this.unsubscribeDrag(['move', 'end']);
    }
  }

  private findClosestValue(position: number): number {
    // 总长度
    const sliderLength = this.getSliderLength();
    // 滑块端点位置
    const sliderStart = this.getSliderStartPosition();

    const ratio = limitNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const retioTrue = this.vertical ? 1 - ratio : ratio;
    return retioTrue * (this.max - this.min) + this.min;
  }

  private getSliderLength(): number {
    return this.vertical ? this.sliderDome.clientHeight : this.sliderDome.clientWidth;
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDome);
    return this.vertical ? offset.top : offset.left;
  }

  private getValueToOffset(value: SliderValue): SliderValue {
    return getPercent(this.min, this.max, value);
  }

  valuesEqual(valueA: SliderValue, valueB: SliderValue): boolean {
    if (typeof valueA !== typeof valueB) {
      return false;
    }
    return valueA === valueB;
  }

  onValueChange(value: SliderValue): void {
    console.log(value);
  }
  private onTouched(): void {}

  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: SliderValue): void {
    this.setValue(value, true);
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }
}

