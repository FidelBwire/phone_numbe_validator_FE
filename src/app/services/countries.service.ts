import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl?: string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = `${environment.apiEndpoint}`;
  }

  getCountries(): Observable<Country[]> {
    let url = `${this.baseUrl}/countries`;    
    return this.http.get<Country[]>(url);
  }

}
