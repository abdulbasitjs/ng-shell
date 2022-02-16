import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdown } from '@configs/index';
import { map } from 'rxjs';

type button = {
  icon?: string;
  btnTitle: string;
  classes?: string;
  handler?: () => {};
};
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() activeIndex!: string;
  @Input() items!: any;
  @Input() labelKey!: string;
  @Input() itemKey!: string;
  @Input('width') width!: string;
  @Output() onSelect = new EventEmitter<IDropdown>();

  public list!: Array<any>;

  constructor() {}

  ngOnInit(): void {
    if (this.itemKey) {
      this.list = this.items[this.itemKey];
    } else {
      this.list = this.items;
    }

    if (this.labelKey) {
      this.list = this.list.map((el, i) => ({
        ...el,
        label: el[this.labelKey],
        active: i === +this.activeIndex,
      }));
    }
  }

  onItemSelect(item: any) {
    this.list = this.list.map((el) => {
      if (el.label === item.label) {
        return { ...el, active: true };
      } else {
        return { ...el, active: false };
      }
    });
    if (this.itemKey) {
      const selectedItem = {
        ...this.items,
        [this.itemKey]: this.items[this.itemKey].filter(
          (el: any) => el[this.labelKey] === item[this.labelKey]
        ),
      };
      this.onSelect.emit(selectedItem);
    } else {
      this.onSelect.emit(item);
    }
  }
}
