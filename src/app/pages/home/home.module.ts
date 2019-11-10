import { NgModule } from '@angular/core';


import { HomeRoutingModule } from './home-routing.module';
import {ShareModule} from '../../share/share.module';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule({
  declarations: [HomeComponent, CarouselComponent],
  imports: [
    ShareModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
