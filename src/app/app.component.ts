/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, takeUntil } from "rxjs";

/* NgRx */
import { Store } from "@ngrx/store";
import { selectTheme } from "./core/state/theme/theme.selectors";

/* Enums */
import { ThemeEnum } from "./shared/enums/theme.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  readonly theme$: Observable<ThemeEnum | null> = this.store.select(selectTheme);
  readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initStoreSubscriptions(): void {
    this.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: ThemeEnum | null) =>
        this.onChangeTheme(theme));
  }

  private onChangeTheme(theme: ThemeEnum | null): void {
    console.log(theme === ThemeEnum.Dark ? '💡 Lights OFF!' : '💡 Lights ON!');
    document.body.classList.toggle('dark', theme === ThemeEnum.Dark);
  }

}
