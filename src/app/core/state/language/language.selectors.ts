/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILanguageState, languageFeatureKey } from "./language.reducers";

export const selectLanguageState = createFeatureSelector<ILanguageState>(languageFeatureKey);

export const selectLanguage = createSelector(
  selectLanguageState,
  (state: ILanguageState) => state.language
);
