/* Angular */
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { navigationFeatureKey, navigationReducer } from "./navigation.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(navigationFeatureKey, navigationReducer)
  ]
})
export class NavigationModule { }
