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
    console.log(this.value);
    if (this.value || this.term.nativeElement.value.trim().length > 0)
    {
      this.value = this.term.nativeElement.value.trim();
      this.onEnter.emit(this.value);
    }
  }

  showCross = 'hide-button'

  handleEscape() {
    this.value = '';
    this.term.nativeElement.value = ''; // check with AB
    this.onEscape.emit(this.value);
    this.showCross = 'hide-button'
  }

  disableSearch = true
  
  enableSearch() {
    if (this.term.nativeElement.value.trim().length > 0) {
      this.showCross = ''
    }
    this.disableSearch = false
    
  }
  
  handleClose() {
    this.value = '';
    this.onEscape.emit(this.value);
    this.showCross = 'hide-button'
  }
  handleBackSpace() {
    if (this.term.nativeElement.value.trim().length < 1) {
      this.showCross = 'hide-button'

      if(this.value) {
        this.value = '';
        this.onSearch.emit(this.value);
      }
    }
  }
}
