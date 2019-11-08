import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from './services.module';
import { Banner } from './data-type/common.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }


  getBanners(): Observable<Banner[]> {
    return this.http.get(this.url+'banner')
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }
}
