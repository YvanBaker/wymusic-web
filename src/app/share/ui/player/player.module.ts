import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerPanelComponent } from './player-panel/player-panel.component';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { ScrollComponent } from './scroll/scroll.component';
import { SliderModule } from '../slider/slider.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    PlayerComponent,
    PlayerPanelComponent,
    FormatTimePipe,
    ScrollComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SliderModule
  ],
  exports: [
    PlayerComponent,
    FormatTimePipe,
    ScrollComponent,
    SliderModule
  ]
})
export class PlayerModule { }
