import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdown } from '@configs/index';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() disableSelection: boolean = false;
  @Input() activeIndex!: string;
  @Input() selected!: any;
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
      this.list = this.list.map((el, i) => {
        let active = false;
        if (this.activeIndex !== 'label') {
          active = i === +this.activeIndex;
        } else {
          active = el[this.labelKey] === this.selected[this.labelKey];
        }
        return {
          ...el,
          label: el[this.labelKey],
          active,
        };
      });
    }
  }

  onItemSelect(item: any) {
    if (!this.disableSelection) {
      this.list = this.list.map((el) => {
        if (el.label === item.label) {
          return { ...el, active: true };
        } else {
          return { ...el, active: false };
        }
      });
    }
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
