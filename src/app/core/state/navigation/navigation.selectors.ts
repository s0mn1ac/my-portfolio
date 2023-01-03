/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INavigationState, navigationFeatureKey } from "./navigation.reducers";

export const selectNavigationState = createFeatureSelector<INavigationState>(navigationFeatureKey);

export const selectNavigationSection = createSelector(
  selectNavigationState,
  (state: INavigationState) => state.section
)
