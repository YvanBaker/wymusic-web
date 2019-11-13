import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {UiModule} from './ui/ui.module';



@NgModule({
  declarations: [],
  imports: [
    NgZorroAntdModule,
    FormsModule,
    CommonModule,
    UiModule
  ],
  exports: [
    NgZorroAntdModule,
    FormsModule,
    CommonModule,
    UiModule
  ]
})
export class ShareModule { }
