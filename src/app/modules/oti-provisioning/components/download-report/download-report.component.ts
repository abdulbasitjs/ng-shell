import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
})
export class AppDownloadReportComponent implements OnInit {
  @Input() title!: string;
  @Input() icon!: string;
  @Output() onDownloadReport: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  downloadReportHandler(name: string) {
    this.onDownloadReport.emit(name);
  }
}
