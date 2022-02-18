import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
})
export class AppModalFooterComponent implements OnInit {
  @Input() closeTitle = 'Cancel';
  @Input() actionTitle = 'Yes';
  @Input() disableAction!: boolean | null;
  @Output() onModalClose = new EventEmitter();
  @Output() onActionHanlder = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.onModalClose.emit();
  }

  onAction() {
    this.onActionHanlder.emit();
  }
}
