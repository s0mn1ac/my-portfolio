/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Enums */
import { ThemeEnum } from "../../../shared/enums/theme.enum";

export enum NavigationTypes {
  ChangeTheme = '[Theme] Change Theme'
}

export const changeTheme = createAction(
  NavigationTypes.ChangeTheme,
  props<{ theme: ThemeEnum }>()
);
