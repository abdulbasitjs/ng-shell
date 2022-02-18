import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-pagination-list]',
  templateUrl: './pagination-list.component.html',
})
export class PaginationListComponent implements OnInit {
  @Input() records!: number[] | undefined;
  @Input() pageSize!: number | undefined;
  @Output() onRecordSelect: EventEmitter<number> = new EventEmitter<number>();
  selectedRecordIndex = 0;
  constructor() {}
  ngOnInit(): void {
    if (this.records && this.records.length) {
      this.selectedRecordIndex = this.records.findIndex(
        (el) => el === this.pageSize
      );
    }
  }

  selectRecord(record: number, i: number) {
    this.onRecordSelect.emit(record);
    this.selectedRecordIndex = i;
  }
}
