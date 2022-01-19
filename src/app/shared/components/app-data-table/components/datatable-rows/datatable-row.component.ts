import { Component, Input, OnInit } from '@angular/core';
import { DataTableService } from '../../app-datatable.service';
import { DataTable } from '../../interfaces/datatable';


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
