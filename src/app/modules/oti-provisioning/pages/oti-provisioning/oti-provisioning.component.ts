import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '@core/services/data-storage.service';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';

@Component({
  selector: 'app-oti-provisioning',
  templateUrl: './oti-provisioning.component.html',
  styleUrls: ['./oti-provisioning.component.scss'],
  host: {
    class: 'oti-provisioning',
  },
})
export class OtiProvisioningComponent implements OnInit {
  sidebarList!: Sidebar[];
  constructor(private dataStorageService: DataStorageService) {
    this.sidebarList =
      this.dataStorageService.getOtiProvisioningSidebarValues();
  }

  ngOnInit(): void {}
}
