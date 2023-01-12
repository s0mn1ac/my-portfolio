/* Angular */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-sidebar',
  templateUrl: './my-sidebar.component.html',
  styleUrls: ['./my-sidebar.component.scss']
})
export class MySidebarComponent {

  @Input() title: string | null = null;
  @Input() showLogo: boolean = false;

  private _isVisible: boolean = false;

  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
  }

  public toggle(value: boolean): void {
    this.isVisible = value;
  }

}
