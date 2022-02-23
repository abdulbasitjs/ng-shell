import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  @Input() placeHolder = '';
  @Output() onSearch = new EventEmitter<string>();
  @Output() onEnter = new EventEmitter<string>();
  @Output() onEscape = new EventEmitter<string>();
  @ViewChild('term') term!: ElementRef;
  value = '';

  constructor() {}

  ngOnInit(): void {}

  onClickHandler(e: Event) {
    this.value = this.term.nativeElement.value;
    this.onSearch.emit(this.value);
  }

  handleEnter() {
    this.value = this.term.nativeElement.value;
    this.onEnter.emit(this.value);
  }

  handleEscape() {
    this.value = '';
    this.onEscape.emit(this.value);
  }
}
