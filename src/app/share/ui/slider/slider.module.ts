import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import {SliderTrackComponent} from './slider-track.component';
import {SliderHandleComponent} from './slider-handle.component';



@NgModule({
  declarations: [
    SliderComponent,
    SliderTrackComponent,
    SliderHandleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    SliderTrackComponent,
    SliderHandleComponent
  ]
})
export class SliderModule { }
