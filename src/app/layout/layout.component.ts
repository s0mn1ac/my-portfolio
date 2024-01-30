/* Angular */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";

/* RxJs */
import { first, Observable, Subject, takeUntil } from "rxjs";

/* NgRx */
import { Store } from "@ngrx/store";
import { selectNavigationSection } from "../core/state/navigation/navigation.selectors";
import { changeTheme } from "../core/state/theme/theme.actions";
import { navigateTo } from "../core/state/navigation/navigation.actions";

/* Services */
import { TranslocoService } from "@ngneat/transloco";

/* Components */
import { MySidebarComponent } from "../shared/components/my-sidebar/my-sidebar.component";

/* Enums */
import { LanguageEnum } from "../shared/enums/language.enum";
import { SectionEnum } from "../shared/enums/section.enum";
import { ThemeEnum } from "../shared/enums/theme.enum";
import { changeLanguage } from '../core/state/language/language.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mySidebarComponent') mySidebarComponent!: MySidebarComponent;

  readonly navigationSection$: Observable<SectionEnum | null> = this.store.select(selectNavigationSection);
  readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public sectionEnum: typeof SectionEnum = SectionEnum;
  public navigationSection!: SectionEnum | null;

  private timeout: number = 100;

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

  private initStoreSubscriptions(): void {

    this.navigationSection$
      .pipe(takeUntil(this.destroy$))
      .subscribe((navigationSection: SectionEnum | null) => this.onChangeNavigationSection(navigationSection));
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
        this.dispatchNavigateTo(null);
      });
  }

  private initUrlFragmentSubscription(): void {
    this.activatedRoute.fragment
      .pipe(first())
      .subscribe((fragment: string | null) =>
        this.dispatchNavigateTo(fragment as SectionEnum ?? SectionEnum.Home));
  }

  public onClickNavigateTo(section: SectionEnum, mySidebarComponent?: MySidebarComponent): void {

    this.dispatchNavigateTo(section);

    if (mySidebarComponent !== null && mySidebarComponent !== undefined) {
      mySidebarComponent.toggle(false);
    }
  }

  public onClickChangeTheme(theme: ThemeEnum): void {
    this.dispatchChangeTheme(theme);
  }

  public onClickChangeLanguage(language: LanguageEnum): void {
    this.dispatchChangeLanguage(language);
  }

  public onToggleSidebar(value: boolean): void {
    this.mySidebarComponent.toggle(value);
  }


  /* ----- Store Dispatchers ------------------------------------------------------------------------------------------------------------ */

  private dispatchNavigateTo(section: SectionEnum | null): void {
    this.store.dispatch(navigateTo({ section }));
  }

  private dispatchChangeTheme(theme: ThemeEnum): void {
    this.store.dispatch(changeTheme({ theme }));
  }

  private dispatchChangeLanguage(language: LanguageEnum): void {
    this.store.dispatch(changeLanguage({ language }));
  }

}
