import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { PaginationService } from '../../app-pagination.service';
import { Pagination } from '../../interfaces/pagination';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnDestroy {
  paginationSubscripton!: Subscription;
  _pages!: Array<number | string>;
  _windowRange!: number;
  _breakMargin!: number;
  _breakLabel!: string;
  _pageSize!: number;
  _totalPages!: number;
  _totalItems!: number;
  _currentPage: number = 1;

  @Input() $$paginationConfigObservable!: Observable<Pagination>;
  @Input() pagiantionConfig!: Pagination | null;
  @Input() isLoading!: boolean | null;
  @Output() onPageSelect: EventEmitter<number> = new EventEmitter<number>();
  @Output() onNextPageSelect: EventEmitter<void> = new EventEmitter<void>();
  @Output() onPrevPageSelect: EventEmitter<void> = new EventEmitter<void>();
  @Output() onFirstPageSelect: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLastPageSelect: EventEmitter<void> = new EventEmitter<void>();
  @Output() onRecordSelect: EventEmitter<number> = new EventEmitter<number>();

  paginationDirection!: 1;

  constructor(public paginationService: PaginationService) {}

  ngOnDestroy(): void {
    if (this.paginationSubscripton) this.paginationSubscripton.unsubscribe();
  }

  ngOnInit(): void {
    this.setPaginationConfig(this.pagiantionConfig!);
    this.reCalculatePages();
    if (this.$$paginationConfigObservable) {
      this.paginationSubscripton = this.$$paginationConfigObservable.subscribe(
        (paginationConfig) => {
          this.setPaginationConfig(paginationConfig);
          this.reCalculatePages();
        }
      );
    }
  }

  setPaginationConfig(config: Pagination) {
    if (config) {
      const {
        currentPage,
        windowRange,
        breakMargin,
        breakLabel = '...',
        pageSize,
        totalPages,
        totalItems
      } = config;
      this._currentPage = currentPage;
      this._windowRange = windowRange;
      this._breakMargin = breakMargin;
      this._breakLabel = breakLabel;
      this._pageSize = pageSize;
      this._totalPages = totalPages;
      this._totalItems = totalItems;
    }
  }

  reCalculatePages() {
    this._pages = this.paginationService.getPages(
      this._currentPage,
      this._windowRange,
      this._breakMargin,
      this._breakLabel,
      this._totalPages
    );
  }

  onFirst() {
    this._currentPage = 1;
    this.reCalculatePages();
    this.onFirstPageSelect.emit();
  }

  onLast() {
    this._currentPage = this._totalPages;
    this.reCalculatePages();
    this.onLastPageSelect.emit();
  }

  onPage(page: number | string) {
    if (typeof page === 'string') return;
    this._currentPage = page;
    this.reCalculatePages();
    this.onPageSelect.emit(this._currentPage);
  }

  onNext() {
    this._currentPage = this._currentPage + 1;
    this.reCalculatePages();
    this.onNextPageSelect.emit();
  }

  onPrev() {
    this._currentPage = this._currentPage - 1;
    this.reCalculatePages();
    this.onPrevPageSelect.emit();
  }
}
