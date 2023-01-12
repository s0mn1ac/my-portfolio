/* Angular */
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";

/* Services */
import { TranslocoService } from "@ngneat/transloco";

/* Enums */
import { LanguageEnum } from "../../shared/enums/language.enum";
import { SectionEnum } from "../../shared/enums/section.enum";
import { ThemeEnum } from "../../shared/enums/theme.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() navigateTo: EventEmitter<SectionEnum> = new EventEmitter<SectionEnum>();
  @Output() changeTheme: EventEmitter<ThemeEnum> = new EventEmitter<ThemeEnum>();
  @Output() changeLanguage: EventEmitter<LanguageEnum> = new EventEmitter<LanguageEnum>();

  @Input() navigationSection!: SectionEnum | null;

  public _isHeaderVisible: boolean = true;

  public languageEnum: typeof LanguageEnum = LanguageEnum;
  public sectionEnum: typeof SectionEnum = SectionEnum;
  public themeEnum: typeof ThemeEnum = ThemeEnum;

  private previousPageYOffset: number = window.pageYOffset;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.isHeaderVisible = window.pageYOffset < 100 || window.pageYOffset < this.previousPageYOffset;
    this.previousPageYOffset = window.pageYOffset;
  }

  get isHeaderVisible(): boolean {
    return this._isHeaderVisible;
  }

  set isHeaderVisible(isHeaderVisible: boolean) {
    this._isHeaderVisible = isHeaderVisible;
  }

  public onClickOpenNavBar(): void {
    this.toggleSidebar.emit(true);
  }

  public onClickNavigateTo(section: SectionEnum): void {
    this.navigateTo.emit(section);
  }

  public onClickChangeTheme(theme: ThemeEnum): void {
    this.changeTheme.emit(theme);
  }

  public onClickChangeLanguage(language: LanguageEnum): void {
    this.changeLanguage.emit(language);
  }

}
