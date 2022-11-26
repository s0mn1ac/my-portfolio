/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/modules/core.module';

/* Components */
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
