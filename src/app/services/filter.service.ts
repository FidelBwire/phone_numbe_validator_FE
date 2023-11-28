import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterOptions } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterEventSubject = new BehaviorSubject<FilterOptions | null>(null);

  constructor() { }

  emitFilterEvent(options: FilterOptions) {
    this.filterEventSubject.next(options);
  }

  getFilterEvent(): Observable<FilterOptions | null> {
    return this.filterEventSubject.asObservable();
  }
}
