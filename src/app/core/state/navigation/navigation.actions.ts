/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Enums */
import { SectionEnum } from "../../../shared/enums/section.enum";

export enum NavigationTypes {
  NavigateTo = '[Navigation] Navigate To...'
}

export const navigateTo = createAction(
  NavigationTypes.NavigateTo,
  props<{ section: SectionEnum | null }>()
);
