import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from './services.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SongSheet, SongSheetList} from './data-type/common.types';
import {map, pluck, switchMap} from 'rxjs/operators';
import {SongService} from './song.service';


// 歌单管理
@Injectable({
  providedIn: ServicesModule
})
export class SheetService {
  constructor(private http: HttpClient,
              private songService: SongService,
              @Inject(API_CONFIG) private url: string) { }

  getSongSheetList(id: number): Observable<SongSheetList[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'playlist/detail', { params })
      .pipe(map((res: {playlist: SongSheet}) => res.playlist))
      .pipe(pluck('tracks'), switchMap(tracks => this.songService.getSongData(tracks)));
  }
}
