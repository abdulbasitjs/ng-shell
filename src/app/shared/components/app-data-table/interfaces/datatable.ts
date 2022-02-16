export enum Order {
  Ascending = 'asc',
  Descending = 'desc',
  Default = ''
}
export interface HeaderList {
  name: string;
  accessor: string;
  cell?: any;
  isSortable?: boolean;
  renderIcon?: boolean;
}

export interface Headers {
  list: HeaderList[];
  sortBy: string;
  order: Order
}
export interface Row {
  [key: string]: any;
}

export interface DataTable {
  totalColumns: number;
  headers: Headers;
  data: any;
  pagination?: boolean;
}
