import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from './services.module';
import {Banner, HotTag, HotSongSheet} from './data-type/common.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';

// 主页管理
@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }


  getBanners(): Observable<Banner[]> {
    return this.http.get(this.url + 'banner')
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }

  getHotTags(): Observable<HotTag[]> {
    return this.http.get(this.url + 'playlist/hot')
      .pipe(map((res: { tags: HotTag[] }) => {
        return res.tags.sort( (x: HotTag, y: HotTag) => x.position - y.position).slice(0, 5);
      }));
  }

  getHotSongSheetList(): Observable<HotSongSheet[]> {
    return this.http.get(this.url + 'personalized')
      .pipe(map((res: { result: HotSongSheet[] }) => res.result.slice(0, 20)));
  }
}
