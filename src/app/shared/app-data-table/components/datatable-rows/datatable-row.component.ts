import { Component, Input, OnInit } from '@angular/core';
import { DataTableService } from '@shared/app-data-table/app-datatable.service';
import { DataTable } from '@shared/app-data-table/interfaces/datatable';

@Component({
  selector: '[app-datatable-rows]',
  templateUrl: './datatable-rows.component.html',
})
export class DataTableRowsComponent implements OnInit {
  @Input() config!: DataTable;
  constructor(private dataTableService: DataTableService) {}

  ngOnInit(): void {
  }

  onRow(row: any) {
    this.dataTableService.setClickedRow(row);
  }
}
