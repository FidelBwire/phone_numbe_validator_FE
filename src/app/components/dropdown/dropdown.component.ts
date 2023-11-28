import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownOption } from './models/dropdown_option';
import { Dropdown, Ripple, initTE, } from "tw-elements";

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

  ngOnInit(): void { 
    initTE({ Dropdown, Ripple });
  }

  ngOnDestroy(): void { }

  protected itemSelected(option: DropdownOption) {
    this.defaultOption = option;
    this.onItemSelected.emit(option);
  }
}
