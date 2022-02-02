import { Component, Input, OnInit } from '@angular/core';
import { DataTable, HeaderList } from '../../interfaces/datatable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
})
export class DataTableComponent implements OnInit {
  @Input('config') dataTableConfig!: DataTable;

  constructor() {}

  handleHeader(header: HeaderList) {
    this.onHeaderSort(header);
  }

  onHeaderSort(header: HeaderList) {
  }

  ngOnInit(): void {}
}
