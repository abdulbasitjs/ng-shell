import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from '@shared/components/app-pagination/app-pagination.service';
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
  @Input() currentPage!: number | undefined;
  @Output() onRow = new EventEmitter<Row>();
  constructor(
    public dtService: DataTableService,
    private paginationService: PaginationService
  ) {}
  ngOnInit(): void {}

  onRowClick(row: Row, id: any) {
    this.onRow.emit({ id: id + 1, ...row });
  }

  generateSR(i: number) {
    if (this.currentPage && this.pageSize) {
      return (
        this.paginationService.paginatePerPageIndex(
          this.currentPage,
          this.pageSize
        ) +
        i +
        1
      );
    }
    return i + 1;
  }
}
