export interface Pagination {
  label: string;
  breakLabel: string;
  breakMargin: number;
  windowRange: number;
  pageSize: number;
  recordRanges: Array<number>;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
