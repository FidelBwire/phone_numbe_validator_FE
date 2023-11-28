import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  private countries: Country[] = [];

  private countriesSubscription!: Subscription;

  constructor(
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  ngOnDestrooy(): void {
    this.countriesSubscription?.unsubscribe();
  }

  getCountries() {
    this.countriesSubscription =this.countriesService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      }
    })
  }

}
