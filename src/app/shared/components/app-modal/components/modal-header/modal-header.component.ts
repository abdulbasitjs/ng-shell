import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
})
export class AppModalHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() size!: string;
  @Output() onModalClose = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.onModalClose.emit();
  }
}
