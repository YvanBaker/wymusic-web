import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import {PlayCountPipe} from '../play-count.pipe';
import {PlayerModule} from './player/player.module';



@NgModule({
  declarations: [
    SingleSheetComponent,
    PlayCountPipe,
  ],
  imports: [
    PlayerModule
  ],
  exports: [
    SingleSheetComponent,
    PlayCountPipe,
    PlayerModule
  ]
})
export class UiModule { }
