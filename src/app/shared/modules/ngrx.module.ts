/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LanguageModule } from 'src/app/core/state/language/language.module';
import { NavigationModule } from "../../core/state/navigation/navigation.module";
import { ThemeModule } from "../../core/state/theme/theme.module";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'My Portfolio Store',
      maxAge: 25
    }),
    LanguageModule,
    NavigationModule,
    ThemeModule
  ]
})
export class NgRxModule { }
