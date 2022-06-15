import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskControlSchema } from '../models/schema';

@Component({
  selector: 'tn-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskComponent),
      multi: true
    },
    DecimalPipe
  ]
})
export class MaskComponent implements OnInit, ControlValueAccessor {

  onChange: Function;
  onTouched: Function;

  @Input() control: MaskControlSchema;
  @Input() inputStyleClass = '';

  @Output() onFocus = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onChanged = new EventEmitter<any>();

  model: any;
  value: Number;
  maskFormat: string;
  thousandSeperator = '.';

  constructor(
    private _numberPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.maskFormat = this.getMaskByType();
    if (!this.control.autoFormat) {
      this.thousandSeperator = '';
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      if (this.control.autoFormat) {
        this.model = this._numberPipe.transform(obj, '', 'vi-VN');
      }
      else {
        this.model = obj.toString();
      }
      this.value = Number(this.model);
    }
    else if (obj === 0) {
      this.model = '0';
      this.value = 0;
    } else {
      this.model = '';
      this.value = null;
    }
  }

  getMaskByType() {
    if (this.control.maskType === 'decimal')
      return `separator.${this.control.decimalPlaces}`;
    return 'separator.0';
  }

  handleFocus() {
    this.onFocus.emit(this.value);
  }

  handleBlur() {
    this.onBlur.emit(this.value);
  }

  handleChangedValue() {
    this.checkValueInRange();
    this.onChange(this.value);
    this.onChanged.emit(this.value);
  }

  checkValueInRange() {
    if (this.model !== null && this.model !== undefined && this.model !== '') {
      this.value = Number(this.model);

      if (this.control.min && this.value < this.control.min) {
        this.value = this.control.min;
        this.model = this.numberToStringVN(this.value);
        this.onChange(this.value);
      }
      else if (this.control.max && this.value > this.control.max) {
        this.value = this.control.max;
        this.model = this.numberToStringVN(this.value);
        this.onChange(this.value);
      }
    }
    else {
      this.value = null;
    }
  }

  numberToStringVN(number) {
    return this._numberPipe.transform(number, '', 'vi-VN');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (!isDisabled)
      this.control.disabled = null;
    else
      this.control.disabled = true;
  }
}
