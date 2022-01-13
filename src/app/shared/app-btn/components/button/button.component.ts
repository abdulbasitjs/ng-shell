import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() config: { icon?: string; btnTitle: string; classes: string } = {
    icon: '',
    btnTitle: '',
    classes: '',
  };
  constructor() {}

  ngOnInit(): void {}
}
