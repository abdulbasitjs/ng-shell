import { Component, OnInit } from '@angular/core';
import { Sidebar } from '@shared/app-side-bar/interfaces/sidebar';
import { DataStorageService } from '@shared/services/data-storage.service';

@Component({
  templateUrl: './oti-provisioning-page.component.html',
})
export class OtiProvisioningPageComponent implements OnInit {
  sidebarList: Sidebar[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.sidebarList =
      this.dataStorageService.getOtiProvisioningSidebarValues();
  }
}
