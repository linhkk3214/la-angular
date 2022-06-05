import { Component, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { Dropdown } from 'primeng/dropdown';
import { MultiSelect } from 'primeng/multiselect';
import { debounceTime, distinctUntilChanged, map, Subject, Subscription } from 'rxjs';
import { ComponentBase } from '../base-class/component-base';
import { Operator } from '../models/enums';
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
export class DropdownComponent extends ComponentBase implements OnInit {
  onChange?: Function;
  onTouched?: Function;
  @ViewChild(Dropdown) dropdown?: Dropdown;
  @ViewChild(MultiSelect) multiSelect?: MultiSelect;
  @ViewChild('inputMask') input: ElementRef;
  @Input() control: DropdownControlSchema = new DropdownControlSchema();

  @Input() set dataSource(value: any[]) {
    this.setDataSource(value);
  }

  @Output('onChanged') onChanged = new EventEmitter<any>();
  @Output('onFirstChanged') onFirstChanged = new EventEmitter<any>();

  dataSourceInternal: any[] = [];
  extraFields: string[];
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

  loading = false;
  valueSearchServer = '';
  getFilterOnServerSearch: Function;
  keyUp = new Subject<KeyboardEvent>();
  subscription: Subscription;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.control._component = this;
    if (!this.control.placeholder) {
      this.control.placeholder = `Chọn ${this.control.label}`;
    }
    if (this.control.fieldPlus) {
      this.extraFields = this.control.fieldPlus.split(',').filter(q => !!q).map(q => q.trim());
    }
    if (this.control.service) {
      if (this.control.isServerLoad) {
        this.createFilterFunction();
        this.subscription = this.keyUp.pipe(
          map(event => (event.target as HTMLInputElement).value),
          debounceTime(500),
          distinctUntilChanged()
        ).subscribe(value => {
          this.getDataByBaseService();
        });
      }
      if (this.control.loadOnInit) {
        this.getDataByBaseService();
      }
    }
    else if (this.control.dataSource) {
      this.setDataSource(this.control.dataSource);
    }
  }

  private createFilterFunction() {
    if (this.control.searchField == null) {
      this.control.searchField = [];
    }
    if (!this.control.disableDisplayFieldServerSearch) {
      if (!this.control.searchField.some(item => item == this.control.displayField)) {
        this.control.searchField.push(this.control.displayField);
      }
    }
    if (this.control.searchField.length == 1) {
      this.getFilterOnServerSearch = value => this.newFilter(this.control.searchField[0], Operator.contain, value);
    }
    else {
      this.getFilterOnServerSearch = value => {
        const result = new Filter({
          logic: 'or',
          filters: []
        });
        for (const fieldSearch of this.control.searchField) {
          result.filters.push(this.newFilter(fieldSearch, Operator.contain, value));
        }
        return result;
      };
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

  reStructureItemObject(item: { [key: string]: any }): SelectItem {
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

    if (this.extraFields) {
      this.extraFields.forEach(f => {
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
    this.loading = true;
    let filters: Filter[] = [];
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

    if (this.control.isServerLoad) {
      if (this.valueSearchServer) {
        filters.push(this.getFilterOnServerSearch(this.valueSearchServer));
      }
    }

    if (defaultFilters.length) {
      filters.push(...defaultFilters);
    }
    if (this.filterFromParents) {
      filters.push(...this.filterFromParents);
    }

    // Bị trường hợp lỗi nếu như selected Value nằm ngoài value phân trang
    // Cần tính lại phương pháp lấy dữ liệu 2 lần để gộp lại
    // if (this.control.isServerLoad && (this.rawValue || this.selectedValue)) {
    //   filters = [
    //     new Filter({
    //       logic: 'or',
    //       filters: [
    //         new Filter({
    //           logic: 'and',
    //           filters
    //         }),
    //         this.newFilter(this.control.valueField, Operator.equal, this.rawValue ? this.rawValue : this.selectedValue)
    //       ]
    //     })
    //   ];
    // }

    // this.control.service.getAllByFilter(filters, this.control.isServerLoad ? 10 : 0, [{ field: this.control.displayField, dir: 1 }])
    this.control.service.getAllByFilter(filters, 0, [{ field: this.control.displayField, dir: 1 }])
      .then(res => {
        this.loading = false;
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

  onShowHandler(evt) {
    if (!this.control.isServerLoad) {
      return;
    }
    const defaultInput = this.dropdown.filterViewChild.nativeElement;
    this._insertTextboxAndFocus(defaultInput);
  }

  onPanelShowHandler(evt) {
    if (!this.control.isServerLoad) {
      return;
    }
    const defaultInput = this.multiSelect.filterInputChild.nativeElement;
    this._insertTextboxAndFocus(defaultInput);
  }

  private _insertTextboxAndFocus(defaultInput) {
    this.input.nativeElement.classList.remove('hide');
    // defaultInput.disabled = true;
    defaultInput.parentElement.insertBefore(this.input.nativeElement, defaultInput);
    this.input.nativeElement.focus();
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
