import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Banner, HotTag, SongSheet} from '../../services/data-type/common.types';
import {NzCarouselComponent} from 'ng-zorro-antd';

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

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(private homeServer: HomeService) {
    this.getBanners();
    this.getHotTags();
    this.getSheetLists();
  }

  getBanners() {
    this.homeServer.getBanners().subscribe(banners => {
      this.banners = banners;
      console.log(banners);
    });
  }

  getHotTags() {
    this.homeServer.getHotTag().subscribe(hotTags => {
      this.hotTags = hotTags;
      console.log(hotTags);
    });
  }

  getSheetLists() {
    this.homeServer.getSongSheetList().subscribe(songSheetList => {
      this.songSheetList = songSheetList;
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
