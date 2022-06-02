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
  changedDataSource = false;
  required = false;
  rootClass = '';
  class = '';
  selectedValueBefore: any;
  selectedValue: any;
  rawValue: any;
  lstObjectSelected: any[] = [];
  filterFromParents: Filter[];
  firstFire = true;

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
    if (!this.control.multiple && this.selectedValue) {
      if (arr.some(x => x.value == this.selectedValue)) {
        this.rawValue = this.selectedValue;
      }
    }
    this.changedDataSource = true;
    this.dataSourceInternal = arr;
    this.setDataSourceSelected();
  }

  handleModelChange(evt) {
    if (this.control.multiple) {
      this.setDataSourceSelected();
      return;
    }
    if (!this.changedDataSource && evt == null && this.selectedValue) {
      this.rawValue = this.selectedValue;
      this.selectedValue = null;
    }
    else {
      if (this.rawValue) {
        this.selectedValue = this.rawValue;
        this.rawValue = null;
      }
      else {
        this.selectedValue = evt;
      }
    }
    if (this.selectedValue != this.selectedValueBefore) {
      this.selectedValueBefore = this.selectedValue;
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
    this.setDataSourceSelected();
    this.checkFirstOnChanged();
  }

  setDataSourceSelected() {
    if (!this.control.multiple) return;
    if (!this.selectedValue || !this.selectedValue.length) {
      this.lstObjectSelected = [];
      return;
    }
    if (this.dataSourceInternal && this.dataSourceInternal.length) {
      this.lstObjectSelected = this.dataSourceInternal.filter(q => this.selectedValue.some(x => x == q.value));
    }
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

  getData(filterParents?: Filter[]) {
    if (!filterParents) filterParents = [];
    this.filterFromParents = filterParents;
    this.getDataByBaseService();
  }

  private async getDataByBaseService(): Promise<void> {
    const filters: Filter[] = [];
    const defaultFilters = [];
    if (this.control.defaultFilters) {
      if (Array.isArray(this.control.defaultFilters)) {
        defaultFilters.push(...this.control.defaultFilters);
      }
      else {
        const lstFilter = await this.control.defaultFilters;
        defaultFilters.push(...lstFilter);
      }
    }

    if (defaultFilters.length) {
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
    if (this.firstFire && this.dataSourceInternal && this.dataSourceInternal.length) {
      if ((!this.control.multiple && this.selectedValue)
        || (this.control.multiple && this.selectedValue && this.selectedValue.length)
      ) {
        this.firstFire = false;
        this.onFirstChanged.emit({
          value: this.selectedValue,
          dataSource: this.dataSourceInternal
        });
      }
    }
  }

  onHideHandler(evt: any) {
    if (this.selectedValueBefore != this.selectedValue) {
      this.selectedValueBefore = this.selectedValue;
      this.setDataSourceSelected();
      this.fireChange();
    }
  }

  removeItem(evt, selectedItem) {
    if (this.control.disabled) {
      return;
    }
    this.selectedValue = this.selectedValue.filter(item => item != selectedItem.value);
    this.setDataSourceSelected();
    this.selectedValueBefore = this.selectedValue;
    this.fireChange();
    evt.preventDefault();
    evt.stopPropagation();
  }
}
