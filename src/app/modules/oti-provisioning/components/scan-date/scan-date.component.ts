import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-scan-date',
  templateUrl: './scan-date.component.html',
})
export class AppScanDateComponent implements OnInit {
  customer!: any;
  stats!: any;
  format = {
    format: 'YYYY-MM-DD',
    displayFormat: 'YYYY-MM-DD',
  };
  selected = {
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  };
  alwaysShowCalendars: boolean;

  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    '2 Day': [moment().subtract(2, 'days'), moment()],
    '3 Day': [moment().subtract(3, 'days'), moment()],
    '4 Day': [moment().subtract(4, 'days'), moment()],
    '5 Day': [moment().subtract(5, 'days'), moment()],
    '1 Week': [moment().subtract(6, 'days'), moment()],
  };

  // invalidDates: moment.Moment[] = [
  //   moment().add(2, 'days'),
  //   moment().add(3, 'days'),
  //   moment().add(5, 'days'),
  // ];

  // isInvalidDate = (m: moment.Moment) => {
  //   return this.invalidDates.some((d) => d.isSame(m, 'day'));
  // };

  constructor(private customerService: CustomerService) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit(): void {
    this.customerService.getCustomerObservable().subscribe((customer) => {
      this.customer = customer;
      this.customerService.getCustomerStats({
        customer: customer.companyName,
        ...this.selected,
      });
    });

    this.customerService.getCustomerStatsObservable().subscribe((stats) => {
      if (stats) {
        this.stats = stats;
        console.log(this.stats);
      }
    });
  }
}
