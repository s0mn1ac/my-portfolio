/* Angular */
import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-type-delete',
  templateUrl: './type-delete.component.html',
  styleUrls: ['./type-delete.component.scss']
})
export class TypeDeleteComponent implements AfterViewInit {

  @ViewChild('textElement') textElement!: ElementRef;
  @ViewChild('blinkElement') blinkElement!: ElementRef;

  @Input() wordArray: string[] = ['Web developer'];
  @Input() textColor = '#383838';
  @Input() fontSize = '25px';
  @Input() blinkWidth = '2px';
  @Input() typingSpeedMilliseconds = 100;
  @Input() deleteSpeedMilliseconds = 50;
  @Input() loopEnabled = false;

  private i = 0;

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.initVariables();
    this.typingEffect();
  }

  private initVariables(): void {
    this.renderer.setStyle(this.textElement.nativeElement, 'font-size', this.fontSize);
    this.renderer.setStyle(this.textElement.nativeElement, 'padding', '0.1em');
    this.renderer.setStyle(this.blinkElement.nativeElement, 'border-right-width', this.blinkWidth);
    this.renderer.setStyle(this.blinkElement.nativeElement, 'border-right-color', this.textColor);
    this.renderer.setStyle(this.blinkElement.nativeElement, 'font-size', this.fontSize);
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split('');
    const loopTyping = (): any => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        setTimeout(() => this.deletingEffect(), 3000);
        return;
      }
      setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };
    loopTyping();
  }

  private deletingEffect(): void {

    if (!this.loopEnabled) {
      return;
    }

    const word = this.wordArray[this.i].split('');
    const loopDeleting = (): any => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join('');
      } else {
        this.i = this.wordArray.length > this.i + 1 ? this.i + 1 : 0;
        setTimeout(() => this.typingEffect(), 500);
        return false;
      }
      setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
      return undefined;
    };
    loopDeleting();
  }

}
