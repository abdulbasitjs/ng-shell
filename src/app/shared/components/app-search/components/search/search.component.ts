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
  @ViewChild('term') term!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onClickHandler(e: Event) {
    this.onSearch.emit(this.term.nativeElement.value);
  }
}
