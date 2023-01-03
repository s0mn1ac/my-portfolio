import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((module) => module.LayoutComponentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // onSameUrlNavigation: 'ignore',
    // scrollPositionRestoration: 'enabled',
    // anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
