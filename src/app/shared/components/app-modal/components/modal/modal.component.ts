import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class AppModalComponent implements OnInit {
  showModalBox = false;
  @Input() set showModal(show: boolean) {
    if (show) {
      setTimeout(() => {
        this.showModalBox = true;
      }, 0)
    } else {
      this.showModalBox = false;
    }
  }

  constructor(public modalService: ModalService) {
  }

  ngOnInit(): void {}
}
