/* Angular */
import { APP_INITIALIZER, NgModule } from '@angular/core';

/* Application modules */
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/modules/core.module';

/* Services */
import { ConfigurationService } from './shared/services/configuration.service';

/* Components */
import { AppComponent } from './app.component';

export function initialConfiguratinLoader(configurationService: ConfigurationService) {
  return () => configurationService.getInitialConfiguration();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialConfiguratinLoader,
      deps: [ConfigurationService],
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
