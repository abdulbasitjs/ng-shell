import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

type button = {
  icon?: string;
  btnTitle: string;
  classes?: string;
  handler?: () => {}
};
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() btnTitle!: string;
  @Input() icon!: string;
  @Input() classes!: string;
  @Input() state!: boolean;

  @Output() clickHandler = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  onClickHandler(e: Event) {
    this.clickHandler.emit(e);
  }
}
