export interface headerList {
  name: string;
  renderIcon?: boolean;
  accessor: string;
  cell?: Object | Function;
}

export interface headers {
  headersIcon: string;
  list: headerList[];
}

export interface row {
  row: {
    [key: string]: string;
  };
  disabled?: boolean;
}

export interface DataTable {
  totalColumns: number;
  headers: headers;
  data: row[];
}
