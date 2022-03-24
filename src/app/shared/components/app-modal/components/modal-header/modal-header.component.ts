import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
})
export class AppModalHeaderComponent implements OnInit {
  @Input() title2!: string;
  @Input() size!: string;
  @Input() classes!: string;
  @Output() onModalClose = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.onModalClose.emit();
  }
}
