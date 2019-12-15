import {Component, OnInit, ViewChild} from '@angular/core';
import {Banner, HotTag, Singer, HotSongSheet} from '../../services/data-type/common.types';
import {NzCarouselComponent} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/internal/operators';
import {SheetService} from '../../services/sheet.service';
import {Store} from '@ngrx/store';
import {AppStoreModule} from '../../store';
import {SetCurrentIndex, SetPlayList, SetSongList} from '../../store/actions/player.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  hotTags: HotTag[];
  hotSongSheetList: HotSongSheet[];
  enterSingers: Singer[];

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(private sheetServer: SheetService,
              private route: ActivatedRoute,
              private store$: Store<AppStoreModule>
  ) {
    this.route.data.pipe(map(res => res.homeData)).subscribe(([banner, hotTag, hotSongSheet, singer]) => {
      this.banners = banner;
      this.hotTags = hotTag;
      this.hotSongSheetList = hotSongSheet;
      this.enterSingers = singer;
    });
  }

  ngOnInit() {
  }

  onBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  onPlaySheet(id: number) {
    this.sheetServer.getSongSheetList(id).subscribe(res => {
      this.store$.dispatch(SetSongList({ songList: res }));
      this.store$.dispatch(SetPlayList({ playList: res }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
    });
  }
}
