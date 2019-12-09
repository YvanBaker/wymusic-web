import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from './services.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Song, SongSheet, SongSheetList} from './data-type/common.types';
import {map} from 'rxjs/operators';


// 歌单管理
@Injectable({
  providedIn: ServicesModule
})
export class SheetService {
  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getSongSheetList(id: number): Observable<SongSheetList[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'playlist/detail', { params })
      .pipe(map((res: {playlist: SongSheet}) => res.playlist))
      .pipe(map(res => res.tracks));
  }

  getSongUrl(id: number): Observable<Song[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'song/url', {params})
      .pipe(map((res: {data: Song[]}) => res.data));
      // .pipe(map((res: {url: string}) => res.url)[0]);
  }

  getSongLit(id: number): Observable<SongSheetList[]> | void {
    this.getSongSheetList(id).subscribe((res: SongSheetList[]) => {
      res.forEach(i => {
        this.getSongUrl(i.id).subscribe((rew: Song[]) => {
          rew.forEach( j => {
            if (i.id === j.id) {
              i.url = j.url;
            }
          });
        });
      });
      return res;
    });
  }
}
