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

    // data.sort((a, b) => {
    //   if (a.row[header.accessor] < b.row[header.accessor]) return -1;
    //   if (a.row[header.accessor] > b.row[header.accessor]) return 1;
    //   return 0;
    // });
  }

  ngOnInit(): void {}
}
