import { Component, OnInit } from '@angular/core';
import { deafultDashboardCards }  from '../../values/dashboard.values';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html'
})
export class DashboardListComponent implements OnInit {
  dashboardItems = deafultDashboardCards
  constructor() {}

  ngOnInit(): void {}

  setLinearBackground(input: string) {
    const styles = {
      'background-image': `linear-gradient(${input})`
    };
    return styles;
  }
}
