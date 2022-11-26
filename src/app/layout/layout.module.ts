/* Angular */
import { NgModule } from '@angular/core';

/* Application modules */
import { LayoutComponentRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

/* Components */
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    LayoutComponentRoutingModule,
    SharedModule
  ],
  declarations: [
    LayoutComponent
  ]
})
export class LayoutComponentModule { }
