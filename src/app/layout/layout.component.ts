/* Angular */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";

/* RxJs */
import { first, Observable, Subject, takeUntil } from "rxjs";

/* NgRx */
import { Store } from "@ngrx/store";
import { selectNavigationSection } from "../core/state/navigation/navigation.selectors";

/* Services */
import { DispatcherService } from '../shared/services/dispatcher.service';

/* Components */
import { MySidebarComponent } from "../shared/components/my-sidebar/my-sidebar.component";

/* Enums */
import { LanguageEnum } from "../shared/enums/language.enum";
import { SectionEnum } from "../shared/enums/section.enum";
import { ThemeEnum } from "../shared/enums/theme.enum";

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly dispatcherService: DispatcherService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly viewportScroller: ViewportScroller
  ) { }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

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


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  /**
   * This method is in charge of initialize and manage the store subscriptions
   * @private
   */
  private initStoreSubscriptions(): void {

    this.navigationSection$
      .pipe(takeUntil(this.destroy$))
      .subscribe((navigationSection: SectionEnum | null) => this.onChangeNavigationSection(navigationSection));
  }

  /**
   * This method is in charge of process the navigation variable each time it's being modified in the store and
   * navigate to the associated fragment into the router
   * @param navigationSection
   * @private
   */
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
        this.dispatcherService.navigateTo(null);
      });
  }

  /**
   * This method is in charge of initialize and manage the store url fragments subscription
   * @private
   */
  private initUrlFragmentSubscription(): void {

    this.activatedRoute.fragment
      .pipe(first())
      .subscribe((fragment: string | null) => this.dispatcherService.navigateTo(fragment as SectionEnum ?? SectionEnum.Home));
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  /**
   * This method is in charge of call a dispatcher in charge of navigate to a new fragment of the url
   * @param section
   * @param mySidebarComponent
   */
  public onClickNavigateTo(section: SectionEnum, mySidebarComponent?: MySidebarComponent): void {

    this.dispatcherService.navigateTo(section);

    if (mySidebarComponent !== null && mySidebarComponent !== undefined) {
      mySidebarComponent.onClickToggle(false);
    }
  }

  /**
   * This method is in charge of call a dispatcher in charge of update the current theme value
   * @param theme
   */
  public onClickChangeTheme(theme: ThemeEnum): void {
    this.dispatcherService.changeThemeLoad(theme);
  }

  /**
   * This method is in charge of call a dispatcher in charge of update the current language value
   * @param language
   */
  public onClickChangeLanguage(language: LanguageEnum): void {
    this.dispatcherService.changeLanguageLoad(language);
  }

  /**
   * This method is in charge of toggle the sidebar
   * @param value
   */
  public onToggleSidebar(value: boolean): void {
    this.mySidebarComponent.onClickToggle(value);
  }

}
