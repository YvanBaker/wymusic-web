import {InjectionToken, NgModule} from '@angular/core';


export const API_CONFIG = new InjectionToken('ApiConfigToken');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: API_CONFIG, useValue: 'http://47.98.225.102:3000/' }
  ]
})
export class ServicesModule { }
