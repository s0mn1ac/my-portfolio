/* Angular */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, takeUntil } from "rxjs";

/* NgRx */
import { Store } from "@ngrx/store";
import { selectTheme } from "./core/state/theme/theme.selectors";

/* Enums */
import { ThemeEnum } from "./shared/enums/theme.enum";
import { TranslocoService } from '@ngneat/transloco';
import { LanguageEnum } from './shared/enums/language.enum';
import { selectLanguage } from './core/state/language/language.selectors';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Language, Theme } from './shared/constants/local-storage.constants';
import { changeLanguage } from './core/state/language/language.actions';
import { changeTheme } from './core/state/theme/theme.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public readonly theme$: Observable<ThemeEnum | null> = this.store.select(selectTheme);
  public readonly language$: Observable<LanguageEnum | null> = this.store.select(selectLanguage);

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly store: Store,
    private readonly translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.loadConfigurationFromLocalStorage();
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initStoreSubscriptions(): void {

    this.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: ThemeEnum | null) => this.onChangeTheme(theme));

    this.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language: LanguageEnum | null) => this.onChangeLanguage(language));
  }

  private onChangeTheme(theme: ThemeEnum | null): void {

    if (theme === null) {
      return;
    }

    console.log(theme === ThemeEnum.Dark ? '💡 Lights OFF!' : '💡 Lights ON!');
    this.localStorageService.set(Theme, theme);
    document.body.classList.toggle('dark', theme === ThemeEnum.Dark);
  }

  private onChangeLanguage(language: LanguageEnum | null): void {

    if (language === null) {
      return;
    }

    console.log(language === LanguageEnum.Es ? '🇪🇸 Language set to Spanish!' : '🇬🇧 Language set to English!');
    this.localStorageService.set(Language, language);
    this.translocoService.setActiveLang(language);
  }

  private loadConfigurationFromLocalStorage(): void {

    const language: LanguageEnum | null = (this.localStorageService.get(Language) as LanguageEnum) ?? null;

    if (language !== null) {
      this.store.dispatch(changeLanguage({ language }));
    }

    const theme: ThemeEnum | null = (this.localStorageService.get(Theme) as ThemeEnum) ?? null;

    if (theme !== null) {
      this.store.dispatch(changeTheme({ theme }));
    }
  }

}
