/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { themeFeatureKey, themeReducer } from "./theme.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(themeFeatureKey, themeReducer)
  ]
})
export class ThemeModule { }
