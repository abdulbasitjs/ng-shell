import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-api-per-limit',
  templateUrl: './api-per-limit.component.html',
  styleUrls: ['./api-per-limit.component.scss'],
})
export class ApiPerLimitComponent implements OnInit {
  list!: Array<{ title: string; count: number }>;
  stats: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.list = [
      {
        title: 'Max API Calls Per Day',
        count: 420,
      },
      {
        title: 'Max API Calls Per Minute',
        count: 48,
      },
      {
        title: 'Max API Calls Per Second',
        count: 1,
      },
    ];
    this.customerService.getCustomerStatsObservable().subscribe((stats) => {
      if (stats) {
        this.stats = stats;
      }
    });
  }
}
