/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { Observable, of } from 'rxjs';

/* Services */
import { ConfigurationService } from './configuration.service';
import { LocalStorageService } from './local-storage.service';
import { TranslocoService } from '@ngneat/transloco';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';

/* Constants */
import { Language } from '../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly localStorageService: LocalStorageService,
    private readonly translocoService: TranslocoService
  ) { }


  /* ----- Public methods --------------------------------------------------------------------------------------------------------------- */

  /**
   * This method is in charge of change the current language and store its new value into the local storage of the browser
   * @param language
   */
  public changeLanguage(language: LanguageEnum): Observable<LanguageEnum> {
    console.log(language === LanguageEnum.Es ? '🇪🇸 Language set to Spanish!' : '🇬🇧 Language set to English!');
    this.configurationService.currentLanguage = language;
    this.localStorageService.set(Language, language);
    this.translocoService.setActiveLang(language);
    return of(language);
  }

}
