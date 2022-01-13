import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from '@shared/app-data-table/interfaces/datatable';

@Component({
  selector: '[app-datatable-headers]',
  templateUrl: './datatable-headers.component.html',
})
export class DataTableHeadersComponent implements OnInit {
  @Input() config!: DataTable;
  constructor() {}

  ngOnInit(): void {
  }
}
