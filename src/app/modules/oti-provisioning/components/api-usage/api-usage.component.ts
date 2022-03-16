import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-api-usage',
  templateUrl: './api-usage.component.html',
  styleUrls: ['./api-usage.component.scss'],
})
export class ApiUsageComponent implements OnInit {
  @Input() isLoading : boolean | null = false;
  list!: Array<{ title: string; count: number, key: string }>;
  totalApiCallUsed: number = 1300000;
  stats: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.list = [
      {
        title: 'URL Scan:',
        key: 'url-scan',
        count: 1,
      },
      {
        title: 'URL Scan Sync:',
        key: 'url-scansync',
        count: 1,
      },
      {
        title: 'URL Scan with ID:',
        key: 'url-scanwithid',
        count: 1,
      },
      {
        title: 'Host Lookup:',
        key: 'host-reputation',
        count: 2,
      },
      {
        title: 'Host URLs:',
        key: 'host-report',
        count: 2,
      },
      {
        title: 'URL Scan Sync with ID:',
        key: 'url-scansyncwithid',
        count: 2,
      },
      {
        title: 'Download Screenshot:',
        key: 'download-screenshot',
        count: 2,
      },
      {
        title: 'Download HTML:',
        key: 'download-html',
        count: 4,
      },
      {
        title: 'Download Text:',
        key: 'download-text',
        count: 3,
      },
      {
        title: 'API Quota:',
        key: 'quota-status',
        count: 3,
      },
      {
        title: 'URL Reputation:',
        key: 'url-reputation',
        count: 3,
      },
      {
        title: 'URL Force Scan:',
        key: 'url-forcescan',
        count: 3,
      },
      {
        title: 'URL Force Scan Sync:',
        key: 'url-forcescansync',
        count: 3,
      },
    ];
    this.customerService.getCustomerStatsObservable().subscribe((stats) => {
      if (stats) {
        this.stats = stats.apiUses;
        this.totalApiCallUsed = <number>(
          Object.values(this.stats).reduce((acc: any, cur: any) => acc + cur, 0)
        );
      }
    });
  }
}
