import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DashboardService } from '@core/services/dashboard.service';
import { DashboardCard } from '../../interfaces/dashboard-card';
import { deafultDashboardCards } from '../../values/dashboard.values';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
})
export class DashboardListComponent implements OnInit {
  dashboardItems = deafultDashboardCards;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {}

  setLinearBackground(input: string) {
    const styles = {
      'background-image': `linear-gradient(${input})`,
    };
    return styles;
  }

  onDashboardSelect(dItem: any) {
    dItem.selected = true;
    this.dashboardService.setCurrentDashboard({
      title: dItem.title,
      desc: dItem.desc,
      route: dItem.route,
      selected: dItem.selcted,
    });
    this.dashboardService.showSelectedDashboard();
  }
}
