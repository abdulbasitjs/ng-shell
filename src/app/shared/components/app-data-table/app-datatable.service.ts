import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataTableService {

  rowHandler$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() {
  }

  setClickedRow(row: any) {
    this.rowHandler$.next(row);
  }

  getCurrentRow() {
    return this.rowHandler$.asObservable()
  }

}
