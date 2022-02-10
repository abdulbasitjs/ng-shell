import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
})
export class AppModalHeaderComponent implements OnInit {
  @Output() onModalClose = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.onModalClose.emit();
  }
}
