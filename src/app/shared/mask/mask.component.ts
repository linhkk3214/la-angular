import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  @Input() maskType: 'decimal' | 'int' = 'decimal';
  _placeholder: string = '';
  @Input() set placeholder(value: string) {
    if (value == null)
      value = '';
    this._placeholder = value;
  }
  @Input() disabled: boolean = null;
  @Input() suffix = '';
  @Input() prefix = '';
  @Input() min: number;
  @Input() max: number;
  @Input() decimalPlaces = 2;
  @Input() viewMode = false;
  @Input() inputStyleClass = '';

  @Output() onFocus = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onChanged = new EventEmitter<any>();

  model: any;
  value: Number;

  constructor(
    private _numberPipe: DecimalPipe
  ) { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.model = this._numberPipe.transform(obj, '', 'vi-VN');
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

  getMaskByType(maskType) {
    if (maskType === 'decimal')
      return `separator.${this.decimalPlaces}`;
    return 'separator.0';
  }

  getThousandSeperator() {
    return '.';
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
    if (this.model) {
      this.value = Number(this.model);

      if (this.min && this.value < this.min) {
        this.value = this.min;
        this.model = this.numberToStringVN(this.value);
        this.onChange(this.value);
      }
      else if (this.max && this.value > this.max) {
        this.value = this.max;
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
      this.disabled = null;
    else
      this.disabled = true;
  }
}
