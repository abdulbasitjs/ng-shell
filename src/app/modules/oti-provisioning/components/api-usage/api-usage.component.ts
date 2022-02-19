import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-usage',
  templateUrl: './api-usage.component.html',
  styleUrls: ['./api-usage.component.scss'],
})
export class ApiUsageComponent implements OnInit {
  list!: Array<{ title: string; count: number }>;
  totalApiCallUsed: number = 1300000;

  constructor() {}

  ngOnInit(): void {
    this.list = [
      {
        title: 'URLs Scan:',
        count: 1,
      },
      {
        title: 'URLs Scan Sync:',
        count: 1,
      },
      {
        title: 'URLs Scan Sync:',
        count: 1,
      },
      {
        title: 'Host Lookup:',
        count: 2,
      },
      {
        title: 'Host URLs:',
        count: 2,
      },
      {
        title: 'Host Report',
        count: 2,
      },
      {
        title: 'Download Screentshot:',
        count: 2,
      },
      {
        title: 'Download HTML:',
        count: 4,
      },
      {
        title: 'Download Text:',
        count: 3,
      },
      {
        title: 'Api Quota:',
        count: 3,
      },
    ];
  }
}