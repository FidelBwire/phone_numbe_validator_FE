import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownOption } from './models/dropdown_option';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() defaultOption?: DropdownOption;
  @Input() options: DropdownOption[] = [];

  @Output() onItemSelected = new EventEmitter<DropdownOption>();

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  protected itemSelected(option: DropdownOption) {
    this.onItemSelected.emit(option);
  }
}
