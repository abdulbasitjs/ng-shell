import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from '../../interfaces/datatable';

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
