import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
})
export class AppDownloadReportComponent implements OnInit {
  @Input() title2!: string;
  @Input() icon!: string;
  @Output() onDownloadReport: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  downloadReportHandler(e: Event) {
    e.preventDefault();
    this.onDownloadReport.emit();
  }
}
