import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterOptions } from 'src/app/models/filter';
import { PhoneNumber } from 'src/app/models/phone_number';
import { FilterService } from 'src/app/services/filter.service';
import { PhoneNumberService } from 'src/app/services/phone-number.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {

  private options!: FilterOptions | null;
  first: number = 0;
  rows: number = 10;
  pageLinkSize = 5;
  totalRecords = 0;
  alwaysShow: boolean = false;
  showFirstLastIcon: boolean = true;
  currentPageReportTemplate: string = 'Showing {first} to {last} of {totalRecords} items';
  rowsPerPageOptions: [] = [];
  page: number = 0;

  phoneNumbers: PhoneNumber[] = [];
  loading: boolean = false;

  filterEventSubscription!: Subscription;
  phoneNumbersSubscription!: Subscription;

  constructor(
    private phoneNumberService: PhoneNumberService,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.subscribeToFilterEvents();
    this.fetchPhoneNumbers();
  }

  ngOnDestroy(): void {
    this.filterEventSubscription?.unsubscribe();
    this.phoneNumbersSubscription?.unsubscribe();
  }

  subscribeToFilterEvents() {
    this.filterEventSubscription = this.filterService.getFilterEvent().subscribe((options) => {
      this.options = options;
      this.fetchPhoneNumbers();
    })
  }

  fetchPhoneNumbers() {
    this.phoneNumbersSubscription = this.phoneNumberService.getPhoneNumbers(this.page, this.rows, { country: this.options?.country, status: this.options?.status }).subscribe({
      next: (data) => {
        this.phoneNumbers = data.content;
        this.first = data.pageable.offset;
        this.rows = data.pageable.pageSize;
        this.totalRecords = data.totalElements;

      },
      error: (err) => {
        console.log('Error fetching phone numbers: ' + err)
      }
    });
  }

  onPageChange(event: PaginatorState) {
    console.log('Page: ' + event.page);
    if (event.rows != undefined)
      this.rows = event.rows;

    if (event.page != undefined)
      this.page = event.page;

    this.fetchPhoneNumbers();
  }

}
