import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DashboardService } from '@core/services/dashboard.service';
import { deafultDashboardCards } from '../../values/dashboard.values';
import { SSORoles } from '@shared/models/roles.model';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardListComponent implements OnInit {
  @Input('list') list!: SSORoles;
  dashboardItems = deafultDashboardCards;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardItems = this.dashboardItems.filter(
      (item) => !!this.list[item.route]
    );
  }

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
    this.dashboardService.showHeader();
  }
}
