import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from '@shared/app-pagination/interfaces/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() config!: Pagination;
  constructor() {}
  ngOnInit(): void {}
}
