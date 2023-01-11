/* Angular */
import { Component } from '@angular/core';

/* NgRx */
import { Store } from "@ngrx/store";
import { navigateTo } from "../../../core/state/navigation/navigation.actions";

/* Enums */
import { SectionEnum } from "../../enums/section.enum";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public sectionTypes: typeof SectionEnum = SectionEnum;

  constructor(
    private store: Store
  ) { }

  public onClickNavigateTo(section: SectionEnum): void {
    this.dispatchNavigateTo(section);
  }

  public navigateByUrl(url: string): void {
    window.open(url, '_blank');
  }


  /* ----- Store Dispatchers ------------------------------------------------------------------------------------------------------------ */

  private dispatchNavigateTo(section: SectionEnum): void {
    this.store.dispatch(navigateTo({ section }));
  }

}
