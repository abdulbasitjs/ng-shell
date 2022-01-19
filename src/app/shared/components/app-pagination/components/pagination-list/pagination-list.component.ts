import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-pagination-list]',
  templateUrl: './pagination-list.component.html',
})
export class PaginationListComponent implements OnInit {
  @Input() records!: number[];
  constructor() {}
  ngOnInit(): void {}
}
