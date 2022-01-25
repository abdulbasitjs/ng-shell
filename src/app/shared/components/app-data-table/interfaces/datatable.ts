import { Observable } from 'rxjs';
export enum Order {
  Ascending = 'asc',
  Descending = 'desc',
  Default = ''
}
export interface HeaderList {
  name: string;
  accessor: string;
  cell?: Object | Function;
}

export interface Headers {
  list: HeaderList[];
  sortBy: string;
  order: Order
}

export interface Row {
  [key: string]: string;
}

export interface DataTable {
  totalColumns: number;
  headers: Headers;
  data: any;
  pagination?: boolean;
}
