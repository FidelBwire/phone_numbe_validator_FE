import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../models/phone_number';
import { FilterOptions } from '../models/filter';
import { Page } from '../pagination/page';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  private baseUrl?: string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = `${environment.apiEndpoint}`;
  }

  getPhoneNumbers(page: number, size: number, filters: FilterOptions): Observable<Page<PhoneNumber>> {
    let url = `${this.baseUrl}/phone-numbers?size=${size}&page=${page}`;

    if(filters.country) {
      url += `&country=${filters.country}`
    }
    if(filters.status) {
      url += `&status=${filters.status}`
    }

    return this.http.get<Page<PhoneNumber>>(url);
  }
}
