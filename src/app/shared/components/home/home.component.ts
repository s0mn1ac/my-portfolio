/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Subject, takeUntil } from "rxjs";

/* NgRx */
import { Store } from '@ngrx/store';
import { navigateTo } from 'src/app/core/state/navigation/navigation.actions';

/* Services */
import { TranslocoService } from "@ngneat/transloco";

/* Enums */
import { SectionEnum } from '../../enums/section.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public wordArray: string[] = [];

  constructor(
    private readonly store: Store,
    private readonly translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.initTranslocoSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onClickNavigateToAbout(): void {
    this.dispatchNavigateTo(SectionEnum.About);
  }

  private initTranslocoSubscription(): void {
    this.translocoService.selectTranslation()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.buildWordArray());
  }

  private buildWordArray(): void {
    this.wordArray = [this.translocoService.translate('home.phrases.p1')];
  }


  /* ----- Store Dispatchers ------------------------------------------------------------------------------------------------------------ */

  private dispatchNavigateTo(section: SectionEnum | null): void {
    this.store.dispatch(navigateTo({ section }));
  }

}
