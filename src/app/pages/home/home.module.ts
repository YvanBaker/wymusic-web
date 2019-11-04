import { NgModule } from '@angular/core';


import { HomeRoutingModule } from './home-routing.module';
import {ShareModule} from '../../share/share.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    ShareModule,
    HomeRoutingModule
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }

