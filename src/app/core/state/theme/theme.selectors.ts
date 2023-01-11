/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IThemeState, themeFeatureKey } from "./theme.reducers";

export const selectThemeState = createFeatureSelector<IThemeState>(themeFeatureKey);

export const selectTheme = createSelector(
  selectThemeState,
  (state: IThemeState) => state.theme
);
