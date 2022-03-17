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
  @Input() value: string | undefined = '';

  constructor() {}

  ngOnInit(): void {}

  onClickHandler(e: Event) {
    if (this.term.nativeElement.value.trim().length > 0) {
      this.value = this.term.nativeElement.value.trim();
      this.onSearch.emit(this.value);
    }
  }

  handleEnter() {
    if (this.term.nativeElement.value.trim().length > 0)
    {
      this.value = this.term.nativeElement.value.trim();
      this.onEnter.emit(this.value);
    }
  }

  handleEscape() {
    this.value = '';
    this.onEscape.emit(this.value);
  }

  disableSearch = true
  enableSearch() {
    this.disableSearch = false
  }
  
  handleClose() {
    this.value = '';
    this.onEscape.emit(this.value);
  }
}
