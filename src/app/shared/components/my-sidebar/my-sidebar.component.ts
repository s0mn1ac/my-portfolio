/* Angular */
import { Component, Input } from '@angular/core';

/* Services */
import { DispatcherService } from '../../services/dispatcher.service';

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
    private readonly dispatcherService: DispatcherService
  ) { }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  /**
   * This method is in charge of call a dispatcher in charge of update the current language value
   * @param language
   */
  public onClickChangeLanguage(language: LanguageEnum): void {
    this.dispatcherService.changeLanguageLoad(language);
  }

  /**
   * This method is in charge of close the sidebar
   * @param value
   */
  public onClickToggle(value: boolean): void {
    this.isVisible = value;
  }

}
