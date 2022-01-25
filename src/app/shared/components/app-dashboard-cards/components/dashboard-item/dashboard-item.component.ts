import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
})
export class DashboardItemComponent implements OnInit {

  @Input() item!: {
    title: string,
    desc: string,
    gradient: string
  }
  constructor() { }

  ngOnInit(): void {
    // console.log(this.item);
  }

}
