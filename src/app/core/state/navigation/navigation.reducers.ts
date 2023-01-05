/* NgRx */
import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { navigateTo } from "./navigation.actions";

/* Enums */
import { SectionEnum } from "../../../shared/enums/section.enum";

export interface INavigationState {
  section: SectionEnum |null
}

export const navigationFeatureKey = 'navigation';

export const initialState: INavigationState = {
  section: null
};

export const navigationReducer: ActionReducer<INavigationState, Action> = createReducer(
  initialState,
  on(navigateTo, (state, { section }): INavigationState => ({
    ...state,
    section: section
  }))
);
