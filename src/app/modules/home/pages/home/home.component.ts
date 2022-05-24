import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'dashboard',
  },
})
export class HomeComponent {
  constructor() {}

  ngOnInit(): void {}
}
