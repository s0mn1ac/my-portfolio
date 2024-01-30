/* Angular */
import { Component, Input } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { changeLanguage } from 'src/app/core/state/language/language.actions';

/* Enums */
import { LanguageEnum } from '../../enums/language.enum';

@Component({
  selector: 'app-my-sidebar',
  templateUrl: './my-sidebar.component.html',
  styleUrls: ['./my-sidebar.component.scss']
})
export class MySidebarComponent {

  @Input() title: string | null = null;
  @Input() showLogo: boolean = false;

  public languageEnum: typeof LanguageEnum = LanguageEnum;

  private _isVisible: boolean = false;

  constructor(
    private readonly store: Store
  ) { }

  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
  }

  public onClickChangeLanguage(language: LanguageEnum): void {
    this.store.dispatch(changeLanguage({ language }));
  }

  public toggle(value: boolean): void {
    this.isVisible = value;
  }

}
