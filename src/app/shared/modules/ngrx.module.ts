/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/* Environment */
import { environment } from "../../../environments/environment";
import { NavigationModule } from "../../core/state/navigation/navigation.module";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'My Portfolio Store',
      logOnly: environment.production,
      maxAge: 25
    }),
    NavigationModule
  ]
})
export class NgRxModule { }
