import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
})
export class SectionTitlteComponent implements OnInit {
  @Input() sectionTitle = '';
  constructor() {}

  ngOnInit(): void {}
}
