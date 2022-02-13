import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { deafultDashboardCards } from '../../values/dashboard.values';
import { SSORolesMappingOfServer, SSORoles } from '@configs/index';
import { HeaderService, Module } from '@core/header/header.service';
import { DashboardCard } from '../../interfaces/dashboard-card';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardListComponent implements OnInit {
  @Input('list') list!: SSORoles;
  @Input() deSelectAll: boolean = false;
  @Input() selected!: Module | DashboardCard;
  dashboardItems = deafultDashboardCards;

  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    this.dashboardItems = this.dashboardItems.filter(
      (item) => !!this.list[SSORolesMappingOfServer[item.route]]
    );
    this.renderCurrentModule();
  }

  setLinearBackground(input: string) {
    const styles = {
      'background-image': `linear-gradient(${input})`,
    };
    return styles;
  }

  onDashboardSelect(dItem: DashboardCard) {
    this.selected = dItem;
    this.dashboardItems = this.selecteCurrentModule(dItem);
    this.headerService.setCurrentModule({
      title: dItem.title,
      desc: dItem.desc,
      route: dItem.route,
      selected: true,
    });
  }

  deselectAllModule() {
    return this.dashboardItems.map((el) => ({
      ...el,
      selected: false,
    }));
  }

  selecteCurrentModule(module: Module | DashboardCard) {
    const { title, desc } = module!;
    return this.dashboardItems.map((el) => {
      if (el.title === title && el.desc === desc) {
        return { ...el, selected: true };
      }
      return { ...el, selected: false };
    });
  }

  renderCurrentModule() {
    this.dashboardItems = this.deselectAllModule();
    if (!this.deSelectAll) {
      this.dashboardItems = this.selecteCurrentModule(this.selected);
    }
  }
}
