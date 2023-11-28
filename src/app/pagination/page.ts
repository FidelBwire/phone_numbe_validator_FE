import { Pageable } from "./pageable";
import { Sort } from "./sort";

export class Page<T> {
  content!: Array<T>;
  pageable: Pageable;
  last!: boolean;
  totalPages!: number;
  totalElements!: number;
  size!: number;
  number!: number;
  sort!: Sort;
  first!: boolean;
  numberOfElements!: number;
  empty!: boolean;

  public constructor() {
    this.pageable = new Pageable();
  }
}
