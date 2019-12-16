import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from './services.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Song,  SongSheetList} from './data-type/common.types';
import {map} from 'rxjs/operators';


// 歌单管理
@Injectable({
  providedIn: ServicesModule
})
export class SongService {
  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }


  getSongUrl(ids: string): Observable<Song[]> {
    const params = new HttpParams().set('id', ids);
    return this.http.get(this.url + 'song/url', {params})
      .pipe(map((res: {data: Song[]}) => res.data));
  }

  getSongData(songs: SongSheetList | SongSheetList[]): Observable<SongSheetList[]> {
    const songListArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songListArr.map(item => item.id).join(',');
    return this.getSongUrl(ids).
      pipe(map(songUrl => this.generateSongList(songListArr, songUrl)));
  }

  private generateSongList(songSheetLists: SongSheetList[], songs: Song[]): SongSheetList[] {
    const result = [] ;
    songSheetLists.forEach(songSheetList => {
      const url = songs.find(song => song.id === songSheetList.id).url;
      if (url) {
        result.push({...songSheetList, url});
      } else {
        result.push({ ...songSheetList });
      }
    });
    return result;
  }
}
