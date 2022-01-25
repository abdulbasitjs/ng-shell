import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

type button = {
  icon?: string;
  btnTitle: string;
  classes?: string;
  handler?: () => {}
};
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() items!: Array<any>;
  @Input('width') width!: string;
  @Output() onSelect = new EventEmitter<Event>();

  constructor() {

  }

  ngOnInit(): void {}

  onItemSelect(item: any) {
    this.onSelect.emit(item);
  }

}
