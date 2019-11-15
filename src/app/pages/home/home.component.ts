import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Banner, HotTag, Singer, SongSheet} from '../../services/data-type/common.types';
import {NzCarouselComponent} from 'ng-zorro-antd';
import {SingerService} from '../../services/singer.service';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  enterSingers: Singer[];

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(private homeServer: HomeService,
              private singerServer: SingerService,
              private route: ActivatedRoute
  ) {
    this.route.data.pipe(map(res => res.homeData)).subscribe(([banner, hotTag, songSheet, singer]) =>{
      this.banners = banner;
      this.hotTags = hotTag;
      this.songSheetList = songSheet;
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

}
