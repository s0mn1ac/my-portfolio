/* Angular */
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

/* RxJs */
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private section: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngAfterViewInit(): void {
    // TODO: Revisar esta funcionalidad
    setTimeout(() => this.onClickNavigateTo(this.section), 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onClickNavigateTo(section: string | null): void {
    console.log(' -> NAVIGATE', section)
    if (section === null) {
      return;
    }
    this.router.navigate([''], { fragment: section })
      .then(() => document.getElementById(section)?.scrollIntoView({behavior: 'smooth'}));
  }

  private initSubscriptions(): void {
    this.activatedRoute.fragment
      .pipe(takeUntil(this.destroy$))
      .subscribe((section: string | null) => this.section = section);
  }

}
