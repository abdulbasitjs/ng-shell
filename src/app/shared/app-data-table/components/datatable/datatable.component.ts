import { Component, OnInit } from '@angular/core';
import { DataTable } from '@shared/app-data-table/interfaces/datatable';
import { DataStorageService } from '@shared/services/data-storage.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
})
export class DataTableComponent implements OnInit {
  dataTableConfig!: DataTable;
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.dataTableConfig =
      this.dataStorageService.getOtiProvisioningCustomersTableConfig();
      console.log(this.dataTableConfig.data);
  }
}
