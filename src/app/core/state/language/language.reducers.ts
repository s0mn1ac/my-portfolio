/* NgRx */
import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { changeLanguage } from "./language.actions";

/* Enums */
import { LanguageEnum } from "../../../shared/enums/language.enum";

export interface ILanguageState {
  language: LanguageEnum |null
}

export const languageFeatureKey = 'language';

export const initialState: ILanguageState = {
  language: null
};

export const languageReducer: ActionReducer<ILanguageState, Action> = createReducer(
  initialState,
  on(changeLanguage, (state, { language }): ILanguageState => ({
    ...state,
    language: language
  }))
);
