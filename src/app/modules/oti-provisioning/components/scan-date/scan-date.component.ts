import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-scan-date',
  templateUrl: './scan-date.component.html',
})
export class AppScanDateComponent implements OnInit {
  selected: any;
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

  constructor() {
    this.alwaysShowCalendars = true;
  }

  ngOnInit(): void {}
}
