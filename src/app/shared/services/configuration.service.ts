/* Angular */
import { Injectable } from '@angular/core';

/* Services */
import { DispatcherService } from './dispatcher.service';
import { LocalStorageService } from './local-storage.service';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';


/* Constants */
import { Language, Theme } from '../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private _currentLanguage!: LanguageEnum;
  private _currentTheme!: ThemeEnum;

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly localStorageService: LocalStorageService
  ) { }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get currentLanguage(): LanguageEnum {
    return this._currentLanguage;
  }

  set currentLanguage(currentLanguage: LanguageEnum) {
    this._currentLanguage = currentLanguage;
  }

  get currentTheme(): ThemeEnum {
    return this._currentTheme;
  }

  set currentTheme(currentTheme: ThemeEnum) {
    this._currentTheme = currentTheme;
  }


  /* ----- Public methods --------------------------------------------------------------------------------------------------------------- */

  /**
   * This method is in charge of retrieve information from the local storage to set the initial app language and theme
   */
  public getInitialConfiguration(): Promise<void> {

    return new Promise<void>((resolve) => {
      this.setLanguage((this.localStorageService.get(Language) as LanguageEnum) ?? null);
      this.setTheme((this.localStorageService.get(Theme) as ThemeEnum) ?? null);
      resolve();
    });
  }


  /* ----- Private methods -------------------------------------------------------------------------------------------------------------- */

  /**
   * This method is in charge call a dispather to update the current language to a new value
   * @param language
   * @private
   */
  private setLanguage(language: LanguageEnum | null): void {

    if (language === null || language === this.currentLanguage) {
      return;
    }

    this.dispatcherService.changeLanguageLoad(language);
  }

  /**
   * This method is in charge call a dispather to update the current theme to a new value
   * @param theme
   * @private
   */
  private setTheme(theme: ThemeEnum | null): void {

    if (theme === null || theme === this.currentTheme) {
      return;
    }

    this.dispatcherService.changeThemeLoad(theme);
  }

}
