import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-url-scanned',
  templateUrl: './url-scanned.component.html',
})
export class UrlScannedComponent implements OnInit {
  list!: Array<{ title: string; count: number }>;

  constructor() {}

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
  }
}
