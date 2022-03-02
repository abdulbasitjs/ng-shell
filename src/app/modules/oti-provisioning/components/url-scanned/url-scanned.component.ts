import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-url-scanned',
  templateUrl: './url-scanned.component.html',
})
export class UrlScannedComponent implements OnInit {
  list!: Array<{ title: string; count: number }>;
  stats: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.list = [
      {
        title: 'Total URLs Scanned',
        count: 0,
      },
      {
        title: 'Malicious URLs Found',
        count: 0,
      },
      {
        title: 'Benign URLs Found',
        count: 0,
      },
    ];
    this.customerService.getCustomerStatsObservable().subscribe((stats) => {
      if (stats) {
        this.stats = stats;
      }
    });
  }
}
