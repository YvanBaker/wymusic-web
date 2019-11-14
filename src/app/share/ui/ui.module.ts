import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import {PlayCountPipe} from '../play-count.pipe';



@NgModule({
  declarations: [
    SingleSheetComponent,
    PlayCountPipe
  ],
  imports: [],
  exports: [
    SingleSheetComponent,
    PlayCountPipe
  ]
})
export class UiModule { }
