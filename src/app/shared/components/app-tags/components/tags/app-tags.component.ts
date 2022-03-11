import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

type tag = { key: number; value: string };

@Component({
  selector: 'app-tags',
  templateUrl: './app-tags.component.html',
})
export class TagsComponent implements OnInit {
  @Output() onClear = new EventEmitter<tag>();
  @Input() tags: Array<tag> = [];

  constructor() {}

  ngOnInit(): void {}

  onTagClear(tag: tag): void {
    this.onClear.emit(tag);
  }
}
