import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerPanelComponent } from './player-panel/player-panel.component';



@NgModule({
  declarations: [PlayerComponent, PlayerPanelComponent],
  imports: [
    CommonModule
  ],
  exports: [PlayerComponent]
})
export class PlayerModule { }
