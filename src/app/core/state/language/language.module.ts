/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { languageFeatureKey, languageReducer } from "./language.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(languageFeatureKey, languageReducer)
  ]
})
export class LanguageModule { }
