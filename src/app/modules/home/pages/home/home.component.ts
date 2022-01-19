import { Component, OnInit } from '@angular/core';
import { DashboardCard } from '@shared/components/app-dashboard-cards/interfaces/dashboard-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'dashboard'
  }
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleDashboardSelect(item: DashboardCard) {
    console.log(item);
  }

}
