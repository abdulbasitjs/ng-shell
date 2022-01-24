import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { DashboardCard } from '@shared/components/app-dashboard-cards/interfaces/dashboard-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'dashboard',
  },
})
export class HomeComponent implements OnInit {
  username!: string;
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const { name = '' } = this.authService.getUser();
    this.username = name;

    this.route.data.subscribe( data => {
      console.log(data);
    })
  }


  handleDashboardSelect(item: DashboardCard) {
    console.log(item);
  }
}
