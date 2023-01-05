/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Subject, takeUntil } from "rxjs";

/* Services */
import { TranslocoService } from "@ngneat/transloco";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public wordArray: string[] = [];

  constructor(
    private translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.initTranslocoSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initTranslocoSubscription(): void {
    this.translocoService.selectTranslation()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.buildWordArray());
  }

  private buildWordArray(): void {
    this.wordArray = [this.translocoService.translate('home.phrases.p1')];
  }

}
