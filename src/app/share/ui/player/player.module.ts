import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerPanelComponent } from './player-panel/player-panel.component';
import {FormatTimePipe} from '../../pipes/format-time.pipe';



@NgModule({
  declarations: [
    PlayerComponent,
    PlayerPanelComponent,
    FormatTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlayerComponent,
    FormatTimePipe
  ]
})
export class PlayerModule { }
