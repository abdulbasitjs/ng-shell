import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EP } from '@configs/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.post(EP.UserListing, {
      page: 1,
      limit: 10,
      sort: 'name',
      order: 'desc',
    });
  }
}
