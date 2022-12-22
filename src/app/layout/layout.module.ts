/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { LayoutComponentRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

/* Components */
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';

@NgModule({
  imports: [
    LayoutComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    BodyComponent
  ]
})
export class LayoutComponentModule { }
