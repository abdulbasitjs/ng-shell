import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataTableService } from '../../app-datatable.service';
import { HeaderList, Row } from '../../interfaces/datatable';

@Component({
  selector: 'app-datatable-rows',
  templateUrl: './datatable-rows.component.html',
})
export class DataTableRowsComponent implements OnInit {
  @Input() rows!: Row[];
  @Input() headers!: HeaderList[];
  @Output() onRow = new EventEmitter<Row>();
  constructor(private dataTableService: DataTableService) {}

  ngOnInit(): void {}

  onRowClick(row: Row, id: any) {
    // this.dataTableService.setClickedRow(row);
    this.onRow.emit({ id: id + 1, ...row });
  }
}
