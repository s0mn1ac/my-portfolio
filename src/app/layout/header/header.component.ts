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

/* Enums */
import { SectionTypes } from "../../shared/enums/section-types.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly navigationSection$: Observable<SectionTypes | null> = this.store.select(selectNavigationSection);

  readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public _isHeaderVisible: boolean = true;

  public sectionTypes: typeof SectionTypes = SectionTypes;

  public navigationSection!: SectionTypes | null;

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
    private viewportScroller: ViewportScroller
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

  public onClickNavigateTo(section: SectionTypes): void {
    this.dispatchNavigateTo(section);
  }

  private initUrlFragmentSubscription(): void {
    this.activatedRoute.fragment
      .pipe(first())
      .subscribe((fragment: string | null) =>
        this.dispatchNavigateTo(fragment as SectionTypes ?? SectionTypes.Home));
  }

  private initStoreSubscriptions(): void {
    this.navigationSection$
      .pipe(takeUntil(this.destroy$))
      .subscribe((navigationSection: SectionTypes | null) =>
        this.onChangeNavigationSection(navigationSection));
  }

  private async onChangeNavigationSection(navigationSection: SectionTypes | null): Promise<void> {

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

  private dispatchNavigateTo(section: SectionTypes): void {
    this.store.dispatch(navigateTo({ section }));
  }

}
