import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oti-provisiong-customers',
  templateUrl: './customers.component.html',
})
export class OtiProvisioningCustomersComponent implements OnInit {

  config = {
    icon: "assets/svg/add-button-icon.svg",
    btnTitle: "Add New Company Profile",
    classes: "button-primary"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
