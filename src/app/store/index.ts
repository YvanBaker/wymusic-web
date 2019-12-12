import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {playerReducer} from './reducers/player.reducer';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({player: playerReducer}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    })
  ]
})
export class AppStoreModule { }
