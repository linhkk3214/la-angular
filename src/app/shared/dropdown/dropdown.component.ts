import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { Dropdown } from 'primeng/dropdown';
import { MultiSelect } from 'primeng/multiselect';
import { Filter } from '../models/grid-info';
import { DropdownControlSchema } from '../models/schema';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit {
  onChange?: Function;
  onTouched?: Function;
  @ViewChild(Dropdown) dropdown?: Dropdown;
  @ViewChild(MultiSelect) multiSelect?: MultiSelect;
  @Input() control: DropdownControlSchema = new DropdownControlSchema();

  @Input() set dataSource(value: any[]) {
    this.setDataSource(value);
  }

  @Output('onChanged') onChanged = new EventEmitter<any>();
  @Output('onFirstChanged') onFirstChanged = new EventEmitter<any>();

  dataSourceInternal: any[] = [];
  required = false;
  rootClass = '';
  class = '';
  selectedValueBefore: any;
  selectedValue: any;

  filterFromParents: Filter[];

  constructor() {
  }

  ngOnInit() {
    this.control._component = this;
    if (!this.control.placeholder) {
      this.control.placeholder = `Chọn ${this.control.label}`;
    }
    if (this.control.service) {
      if (this.control.loadOnInit) {
        this.getDataByBaseService();
      }
    }
    else if (this.control.dataSource) {
      this.setDataSource(this.control.dataSource);
    }
  }

  private setDataSource(dataSource: any[] | undefined) {
    const arr = [];
    if (dataSource != null && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        arr.push(this.reStructureItemObject(dataSource[i]));
      }
    }
    this.dataSourceInternal = arr;
  }

  onChangeSelected(event: any) {
    if (this.control.multiple) {
      return;
    }
    else {
      this.fireChange();
    }
  }

  fireChange() {
    if (this.onChange) {
      this.onChange(this.selectedValue);
    }
    this.onChanged.next({
      value: this.selectedValue
    });
  }

  reStructureItemObject(item: { [key: string]: any }, extraFields?: string[]): SelectItem {
    const op: any = {};
    if (item[this.control.displayField as string]) {
      op['label'] = item[this.control.displayField as string];
    }
    else {
      op['label'] = item['label'];
    }
    if (item[this.control.valueField as string]) {
      op['value'] = item[this.control.valueField as string];
    }
    else {
      op['value'] = item['value'];
    }

    if (extraFields) {
      extraFields.forEach(f => {
        op[f] = item[f];
      });
    }

    return <SelectItem>op;
  }

  writeValue(obj: any): void {
    console.log(this.control.field, obj);
    if (obj !== undefined && obj !== '' && obj !== null) {
      if (!this.control.multiple) {
        this.selectedValue = obj;
      }
      else {
        if (obj instanceof Array) {
          this.selectedValue = obj;
        }
        else {
          this.selectedValue = obj.split(',');
        }
      }
    }
    else {
      if (!this.control.multiple) {
        this.selectedValue = null;
      }
      else {
        this.selectedValue = [];
      }
    }
    this.selectedValueBefore = this.selectedValue;
    this.checkFirstOnChanged();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.control.disabled = isDisabled;
  }

  onHideHandler(evt: any) {
    if (this.selectedValueBefore != this.selectedValue) {
      this.selectedValueBefore = this.selectedValue;
      this.fireChange();
    }
  }

  getData(filterParents?: Filter[]) {
    if (!filterParents) filterParents = [];
    this.filterFromParents = filterParents;
    this.getDataByBaseService();
  }

  private async getDataByBaseService(): Promise<void> {
    const filters: Filter[] = [];
    const defaultFilters = [];

    if (defaultFilters && defaultFilters.length) {
      filters.push(...defaultFilters);
    }
    if (this.filterFromParents) {
      filters.push(...this.filterFromParents);
    }
    this.control.service.getAllByFilter(filters)
      .then(res => {
        this.setDataSource(res.data);
        this.checkFirstOnChanged();
      });
  }

  private checkFirstOnChanged() {
    if (this.dataSourceInternal && this.dataSourceInternal.length) {
      if ((!this.control.multiple && this.selectedValue)
        || (this.control.multiple && this.selectedValue && this.selectedValue.length)
      ) {
        this.onFirstChanged.emit({
          value: this.selectedValue,
          dataSource: this.dataSourceInternal
        });
      }
    }
  }
}
