import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '@core/services/loader.service';
import { ProfileService } from '../../services/profile-management.service';
import { IUserItem } from 'src/app/modules/user-management/user-management.model';
import { NavigationService } from '@core/services/navigation.service';

type Module = { text: string; label: string; role: string };

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  host: {
    class: 'user-profile-detail',
  },
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  user!: IUserItem;
  modules!: Module[];
  constructor(
    public profileService: ProfileService,
    public loaderService: LoaderService,
    public navigationService: NavigationService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.userSubscription = this.profileService
      .getCurrentUserObservable()
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.modules = this.profileService.getModules(user.permission);
        }
      });
    this.profileService.getMe();
  }
}
