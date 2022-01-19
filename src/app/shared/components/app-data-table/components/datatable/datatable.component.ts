import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '@core/services/data-storage.service';
import { DataTable } from '../../interfaces/datatable';


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
  }
}
