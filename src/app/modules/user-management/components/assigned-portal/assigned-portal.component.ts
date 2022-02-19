import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './assigned-portal.component.html',
})
export class AssignedPortalComponent implements OnInit {
  @Input() permissions: any;
  constructor() {}
  ngOnInit(): void {}
}
