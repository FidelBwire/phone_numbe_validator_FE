import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountriesService } from 'src/app/services/countries.service';
import { DropdownOption } from '../dropdown/models/dropdown_option';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  private countries: Country[] = [];

  protected selectedCountry?: number;
  protected selectedStatus?: string;

  protected countriesDropdownOptions: DropdownOption[] = [];

  protected statusDropdownOptions: DropdownOption[] = [
    { key: "Valid", value: "Valid" },
    { key: "Invalid", value: "Invalid" },
  ]

  private countriesSubscription!: Subscription;

  constructor(
    private countriesService: CountriesService,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  ngOnDestrooy(): void {
    this.countriesSubscription?.unsubscribe();
  }

  protected getCountries() {
    this.countriesSubscription = this.countriesService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.countries.forEach((country) => {
          this.countriesDropdownOptions.push({
            key: country.countryId,
            value: country.name
          })
        });
      }
    })
  }

  protected applyFilters() {
    this.filterService.emitFilterEvent({
      country: this.selectedCountry,
      status: this.selectedStatus,
    })
  }

  protected selectCountry(option: DropdownOption) {
    this.selectedCountry = option.key;
  }

  protected selectStatus(option: DropdownOption) {
    this.selectedStatus = option.key;
  }

  protected Reset() {
    this.selectedCountry = undefined;
    this.selectedStatus = undefined;
    this.applyFilters();
  }

}
