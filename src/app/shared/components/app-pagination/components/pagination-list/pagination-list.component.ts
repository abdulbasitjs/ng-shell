import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-pagination-list]',
  templateUrl: './pagination-list.component.html',
})
export class PaginationListComponent implements OnInit {
  @Input() records: number[] | undefined = [10, 20, 30, 50, 100];
  @Input() set pageSize(value: number | undefined) {
    if (value) {
      this.update(value);
    }
  }

  @Output() onRecordSelect: EventEmitter<number> = new EventEmitter<number>();
  @Output() handleOutsideClick: EventEmitter<void> = new EventEmitter<void>();
  selectedRecordIndex = 0;
  constructor() {}
  ngOnInit(): void {}

  update(pageSize: number | undefined) {
    if (this.records && this.records.length) {
      this.selectedRecordIndex = this.records.findIndex(
        (el) => el === pageSize
      );
    }

    console.log(this.selectedRecordIndex, this.records, pageSize);
  }

  selectRecord(record: number, i: number) {
    this.onRecordSelect.emit(record);
    this.selectedRecordIndex = i;
  }

  onOutsideClick() {
    this.handleOutsideClick.emit();
  }
}
