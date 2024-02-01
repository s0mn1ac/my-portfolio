/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { languageFeatureName, languageReducer } from './language.reducers';
import { LanguageEffects } from './language.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(languageFeatureName, languageReducer),
    EffectsModule.forFeature([LanguageEffects])
  ]
})
export class LanguageModule { }
