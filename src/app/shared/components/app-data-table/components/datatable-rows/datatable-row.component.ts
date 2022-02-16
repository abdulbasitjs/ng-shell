import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderList, Row } from '../../interfaces/datatable';

@Component({
  selector: 'app-datatable-rows',
  templateUrl: './datatable-rows.component.html',
})
export class DataTableRowsComponent implements OnInit {
  @Input() isLoading: boolean | null = true;
  @Input() pageSize: number | undefined = 10;
  @Input() rows!: Row[];
  @Input() headers!: HeaderList[];
  @Output() onRow = new EventEmitter<Row>();
  constructor() {}
  ngOnInit(): void {}

  onRowClick(row: Row, id: any) {
    this.onRow.emit({ id: id + 1, ...row });
  }
}
