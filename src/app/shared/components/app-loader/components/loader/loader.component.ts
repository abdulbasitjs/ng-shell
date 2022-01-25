import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Output() onLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoading!: boolean;
  loaderSubscription!: Subscription;
  progressWidth$!: Observable<number>;
  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loader.getLoader().subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.progressWidth$ = this.loader.getProgressWidth();
      this.onLoading.emit(isLoading);
    });
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }
}
