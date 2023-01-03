/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Enums */
import { SectionTypes } from "../../../shared/enums/section-types.enum";

export enum NavigationTypes {
  NavigateTo = '[Navigation] Navigate To...'
}

export const navigateTo = createAction(
  NavigationTypes.NavigateTo,
  props<{ section: SectionTypes }>()
);
