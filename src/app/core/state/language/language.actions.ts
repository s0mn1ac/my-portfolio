/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Enums */
import { LanguageEnum } from "../../../shared/enums/language.enum";

export enum LanguageTypes {
  ChangeLanguage = '[Language] Change Language'
}

export const changeLanguage = createAction(
  LanguageTypes.ChangeLanguage,
  props<{ language: LanguageEnum }>()
);
