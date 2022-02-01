import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  pages!: any;
  @Input() config!: Pagination;
  paginationDirection!: 1;

  constructor() {}

  ngOnInit(): void {
    this.pages = [10, 11, '...', 25, 26];
  }
}
