import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  host: {
    class: 'auth',
  },
})
export class AuthComponent implements OnInit {
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.hideLoader();
  }
}
