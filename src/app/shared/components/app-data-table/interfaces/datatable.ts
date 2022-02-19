export enum Order {
  Ascending = 'asc',
  Descending = 'desc',
  Default = ''
}

export enum Status {
  Suspended = 'Suspended',
  Disabled = 'Disabled',
  Active = 2,
}
export interface HeaderList {
  name: string;
  accessor: string;
  cell?: any;
  isSortable?: boolean;
  renderIcon?: boolean;
  width?: string;
}

export interface Headers {
  list: HeaderList[];
  sortBy: string;
  order: Order;
  columnsTemplate?: string;
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
