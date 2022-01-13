import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from '@shared/app-data-table/interfaces/datatable';

@Component({
  selector: '[app-datatable-rows]',
  templateUrl: './datatable-rows.component.html',
})
export class DataTableRowsComponent implements OnInit {
  @Input() config!: DataTable
  constructor() {}

  ngOnInit(): void {
  }
}
