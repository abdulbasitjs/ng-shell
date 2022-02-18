import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-per-limit',
  templateUrl: './api-per-limit.component.html',
  styleUrls: ['./api-per-limit.component.scss'],
})
export class ApiPerLimitComponent implements OnInit {
  list!: Array<{ title: string; count: number }>;

  constructor() {}

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
  }
}
