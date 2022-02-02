import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oti-provisioning-package-detail',
  templateUrl: './oti-provisioning-package-detail.component.html',
  styleUrls: ['./oti-provisioning-package-detail.component.scss']
})
export class OtiProvisioningPackageDetailComponent implements OnInit {

  apisQuota: Array<any> = [
    { id: 0, key: 'urlreputation', value: 1000 },
    { id: 1, key: 'scan', value: 1100 },
    { id: 2, key: 'scansync', value: 1200 },
    { id: 3, key: 'urlscreenshot', value: 13000 },
    { id: 4, key: 'urlhtml', value: 14000 },
    { id: 5, key: 'urltxt', value: 15000 },
    { id: 6, key: 'hostreputation', value: 16000 },
    { id: 7, key: 'hostreport', value: 17000 },
    { id: 8, key: 'quotastatus', value: 1800 },
    { id: 9, key: 'scanwithid', value: 2000 },
    { id: 10, key: 'scanasyncwithid', value: 2100 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
