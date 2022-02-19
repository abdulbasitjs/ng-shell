import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataTableService {

  private _tmList = new Map();

  templateList$: BehaviorSubject<TemplateRef<any> | null> =
    new BehaviorSubject<TemplateRef<any> | null>(null);

  constructor() {}

  addTemplate(key: string, template: TemplateRef<any>) {
    this._tmList.set(key, template);
  }

  removeTemplate(key: string) {
    this._tmList.delete(key);
  }

  getTemplate(key: string) {
    return this._tmList.get(key);
  }

}
