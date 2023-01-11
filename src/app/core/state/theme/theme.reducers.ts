/* NgRx */
import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { changeTheme } from "./theme.actions";

/* Enums */
import { ThemeEnum } from "../../../shared/enums/theme.enum";

export interface IThemeState {
  theme: ThemeEnum |null
}

export const themeFeatureKey = 'theme';

export const initialState: IThemeState = {
  theme: null
};

export const themeReducer: ActionReducer<IThemeState, Action> = createReducer(
  initialState,
  on(changeTheme, (state, { theme }): IThemeState => ({
    ...state,
    theme: theme
  }))
);
