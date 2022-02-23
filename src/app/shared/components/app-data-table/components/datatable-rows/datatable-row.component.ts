import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataTableService } from '../../app-datatable.service';
import { HeaderList, Row, Status } from '../../interfaces/datatable';

@Component({
  selector: 'app-datatable-rows',
  templateUrl: './datatable-rows.component.html',
})
export class DataTableRowsComponent implements OnInit {
  readonly Status = Status;
  @Input() isLoading: boolean | null = true;
  @Input() pageSize: number | undefined = 10;
  @Input() rows!: Row[];
  @Input() headers!: HeaderList[];
  @Input() columnsTemplate!: string | undefined;
  @Output() onRow = new EventEmitter<Row>();
  constructor(public dtService: DataTableService) {}
  ngOnInit(): void {}

  onRowClick(row: Row, id: any) {
    this.onRow.emit({ id: id + 1, ...row });
  }
}
