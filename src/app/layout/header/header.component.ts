import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public _isHeaderVisible: boolean = true;

  private previousPageYOffset: number = window.pageYOffset;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.isHeaderVisible = window.pageYOffset < 100 || window.pageYOffset < this.previousPageYOffset;
    this.previousPageYOffset = window.pageYOffset;
  }

  constructor() { }

  ngOnInit(): void {
  }

  get isHeaderVisible(): boolean {
    return this._isHeaderVisible;
  }

  set isHeaderVisible(isHeaderVisible: boolean) {
    this._isHeaderVisible = isHeaderVisible;
  }

}
