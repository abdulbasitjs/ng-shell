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
  // descIcon: string = 'assets/svg/clear-url-search-icon.svg';

  constructor() {}

  ngOnInit(): void {}

  onHeaderClick(header: HeaderList) {
    this.renderCorrectIcon(header);
    this.onHeader.emit([this.headers.sortBy, this.headers.order]);
  }

  private renderCorrectIcon(header: HeaderList) {
    if (this.headers.sortBy === header.accessor) {
      this.toggleIcon();
    } else {
      this.headers.order = Order.Ascending;
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
