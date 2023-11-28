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

  private selectedCountry!: number;
  private selectedStatus!: string;

  protected countriesDropdownOptions: DropdownOption[] = [];
  protected defaultOption!: DropdownOption;

  protected statusDropdownOptions: DropdownOption[] = [
    { key: "Valid", value: "Valid"},
    { key: "Invalid", value: "Invalid"},
  ]
  protected defaultStatus: DropdownOption = this.statusDropdownOptions[0];

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

        if (this.countriesDropdownOptions.length > 0) {
          this.defaultOption = this.countriesDropdownOptions[0];
        }
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
    this.selectStatus = option.key;
  }

}
