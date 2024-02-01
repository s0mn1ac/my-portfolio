/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { changeLanguageError, changeLanguageLoad, changeLanguageSuccess } from 'src/app/core/state/language/language.actions';
import { navigateTo } from 'src/app/core/state/navigation/navigation.actions';
import { changeThemeError, changeThemeLoad, changeThemeSuccess } from 'src/app/core/state/theme/theme.actions';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';
import { SectionEnum } from '../enums/section.enum';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  constructor(
    private readonly store: Store
  ) { }


  /* ----- Language --------------------------------------------------------------------------------------------------------------------- */

  public changeLanguageLoad(language: LanguageEnum): void {
    this.store.dispatch(changeLanguageLoad({ language }));
  }

  public changeLanguageSuccess(language: LanguageEnum): void {
    this.store.dispatch(changeLanguageSuccess({ language }));
  }

  public changeLanguageError(error: Error): void {
    this.store.dispatch(changeLanguageError({ error }));
  }


  /* ----- Navigation ------------------------------------------------------------------------------------------------------------------- */

  public navigateTo(section: SectionEnum | null): void {
    this.store.dispatch(navigateTo({ section }));
  }


  /* ----- Theme ------------------------------------------------------------------------------------------------------------------------ */

  public changeThemeLoad(theme: ThemeEnum): void {
    this.store.dispatch(changeThemeLoad({ theme }));
  }

  public changeThemeSuccess(theme: ThemeEnum): void {
    this.store.dispatch(changeThemeSuccess({ theme }));
  }

  public changeThemeError(error: Error): void {
    this.store.dispatch(changeThemeError({ error }));
  }

}
