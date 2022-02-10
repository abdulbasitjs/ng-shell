import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: '[app-loader]',
  templateUrl: './loader.component.html',
  host: {
    class: 'app-loader',
  },
})
export class LoaderComponent implements OnInit {
  @Input() isLoading: Boolean | null = false;
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
