import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Headers, HeaderList, Order } from '../../interfaces/datatable';

@Component({
  selector: 'app-datatable-headers',
  templateUrl: './datatable-headers.component.html',
})
export class DataTableHeadersComponent implements OnInit {
  @Input() headers!: Headers;
  @Output() onHeader: EventEmitter<Array<string>> = new EventEmitter<
    Array<string>
  >();
  ascIcon: string = 'assets/svg/Sorting.svg';
  defaultIcon: string = 'assets/svg/table-sorting-icon.svg';

  constructor() {}

  ngOnInit(): void {}

  onHeaderClick(header: HeaderList) {
    this.renderCorrectIcon(header);
    this.onHeader.emit([this.headers.sortBy, this.headers.order]);
  }

  private renderCorrectIcon(header: HeaderList) {
    header.isSortable = false;
    if (this.headers.sortBy === header.accessor) {
      this.toggleIcon();
    } else {
      this.headers.order = Order.Ascending;
      this.headers.list.forEach((h) => {
        if (h.accessor !== header.accessor) {
          h.isSortable = true;
        }
      });
    }
    this.headers.sortBy = header.accessor;
  }

  private toggleIcon() {
    this.headers.order =
      this.headers.order === Order.Ascending
        ? Order.Descending
        : Order.Ascending;
  }
}
