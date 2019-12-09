import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {HomeService} from '../../services/home.service';
import {SingerService} from '../../services/singer.service';
import {Banner, HotTag, Singer, HotSongSheet} from '../../services/data-type/common.types';
import {forkJoin, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

type HomeDataType = [Banner[], HotTag[], HotSongSheet[], Singer[]];

@Injectable()
export class HomeResolveService implements Resolve<HomeDataType> {
  constructor(private homeServer: HomeService,
              private singerServer: SingerService) {}
  resolve(): Observable<HomeDataType> {
    return forkJoin([
      this.homeServer.getBanners(),
      this.homeServer.getHotTags(),
      this.homeServer.getHotSongSheetList(),
      this.singerServer.getEnterSinger()
    ]).pipe(first());
  }
}
