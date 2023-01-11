/* Angular */
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";

/* RxJs */
import { first, Observable, Subject, takeUntil } from "rxjs";

/* NgRx */
import { Store } from "@ngrx/store";
import { navigateTo } from "../../core/state/navigation/navigation.actions";
import { selectNavigationSection } from "../../core/state/navigation/navigation.selectors";

/* Services */
import { TranslocoService } from "@ngneat/transloco";

/* Enums */
import { LanguageEnum } from "../../shared/enums/language.enum";
import { SectionEnum } from "../../shared/enums/section.enum";
import { ThemeEnum } from "../../shared/enums/theme.enum";
import { changeTheme } from "../../core/state/theme/theme.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly navigationSection$: Observable<SectionEnum | null> = this.store.select(selectNavigationSection);

  readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public _isHeaderVisible: boolean = true;

  public languageEnum: typeof LanguageEnum = LanguageEnum;
  public sectionEnum: typeof SectionEnum = SectionEnum;
  public themeEnum: typeof ThemeEnum = ThemeEnum;

  public navigationSection!: SectionEnum | null;

  private previousPageYOffset: number = window.pageYOffset;

  private timeout: number = 100;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.isHeaderVisible = window.pageYOffset < 100 || window.pageYOffset < this.previousPageYOffset;
    this.previousPageYOffset = window.pageYOffset;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private viewportScroller: ViewportScroller,
    private translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.initStoreSubscriptions();
  }

  ngAfterViewInit(): void {
    this.initUrlFragmentSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get isHeaderVisible(): boolean {
    return this._isHeaderVisible;
  }

  set isHeaderVisible(isHeaderVisible: boolean) {
    this._isHeaderVisible = isHeaderVisible;
  }

  public onClickNavigateTo(section: SectionEnum): void {
    this.dispatchNavigateTo(section);
  }

  public onClickChangeTheme(theme: ThemeEnum): void {
    this.dispatchChangeTheme(theme);
  }

  public onClickChangeLanguage(language: LanguageEnum): void {
    this.translocoService.setActiveLang(language);
  }

  private initUrlFragmentSubscription(): void {
    this.activatedRoute.fragment
      .pipe(first())
      .subscribe((fragment: string | null) =>
        this.dispatchNavigateTo(fragment as SectionEnum ?? SectionEnum.Home));
  }

  private initStoreSubscriptions(): void {
    this.navigationSection$
      .pipe(takeUntil(this.destroy$))
      .subscribe((navigationSection: SectionEnum | null) =>
        this.onChangeNavigationSection(navigationSection));
  }

  private async onChangeNavigationSection(navigationSection: SectionEnum | null): Promise<void> {

    if (navigationSection === null) {
      return;
    }

    await this.router
      .navigate([''], { fragment: navigationSection })
      .then(() => setTimeout(() => this.viewportScroller.scrollToAnchor(navigationSection), this.timeout))
      .finally(() => {
        this.timeout = 0;
        this.navigationSection = navigationSection;
      });
  }


  /* ----- Store Dispatchers ------------------------------------------------------------------------------------------------------------ */

  private dispatchNavigateTo(section: SectionEnum): void {
    this.store.dispatch(navigateTo({ section }));
  }

  private dispatchChangeTheme(theme: ThemeEnum): void {
    this.store.dispatch(changeTheme({ theme }));
  }

}
