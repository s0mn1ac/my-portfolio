/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Enums */
import { ThemeEnum } from "../../../shared/enums/theme.enum";

export enum ThemeTypes {
  ChangeTheme = '[Theme] Change Theme'
}

export const changeTheme = createAction(
  ThemeTypes.ChangeTheme,
  props<{ theme: ThemeEnum }>()
);
