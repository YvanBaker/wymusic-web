// tslint:disable-next-line:max-line-length
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output, EventEmitter
} from '@angular/core';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';
import {timer} from 'rxjs';

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);


@Component({
  selector: 'app-scroll',
  template: `
    <div class="scroll" id="wrap" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: ['.scroll{width: 100%; height: 100%; overflow: hidden}'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data: any[];
  @Input() refreshDelay = 1000;
  @ViewChild('wrap', { static: true }) private wrapRef: ElementRef;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() private onScrollEnd = new EventEmitter<number>();

  private bs: BScroll;


  constructor(readonly el: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.wrapRef);
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        interactive: true
      },
      mouseWheel: {}
    });
    this.bs.on('scrollEnd', ({ y }) => this.onScrollEnd.emit(y));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.refreshScroll();
    }
  }

  scrollToElement(...args) {
    this.bs.scrollToElement.apply(this.bs, args);
  }

  // 刷新滚动
  private reFresh() {
    this.bs.refresh();
  }

  refreshScroll() {
    timer(this.refreshDelay).subscribe(() => {
      this.reFresh();
    });
   /* setTimeout(() => {
      this.reFresh();
    }, this.refreshDelay);*/
  }

}
