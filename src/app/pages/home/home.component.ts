import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Banner, HotTag, Singer, SongSheet} from '../../services/data-type/common.types';
import {NzCarouselComponent} from 'ng-zorro-antd';
import {SingerService} from '../../services/singer.service';

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
              private singerServer: SingerService
  ) {
    this.getBanners();
    this.getHotTags();
    this.getSheetLists();
    this.getEnterSingers();
  }

  getBanners() {
    this.homeServer.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }

  getHotTags() {
    this.homeServer.getHotTags().subscribe(hotTags => {
      this.hotTags = hotTags;
    });
  }

  getSheetLists() {
    this.homeServer.getSongSheetList().subscribe(songSheetList => {
      this.songSheetList = songSheetList;
    });
  }

  getEnterSingers() {
    this.singerServer.getEnterSinger().subscribe(enterSingers => {
      this.enterSingers = enterSingers;
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
