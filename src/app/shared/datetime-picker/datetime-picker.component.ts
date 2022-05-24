import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { Calendar } from 'primeng/calendar';
import { DateTimeControlSchema } from '../models/schema';

@Component({
  selector: 'datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements OnInit {
  @ViewChild('calendar', { static: true }) calendar?: Calendar;

  @Input() control: DateTimeControlSchema = new DateTimeControlSchema();
  @Input() disabled: boolean = false;

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFocus: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  onChange?: Function;
  onTouched?: Function;

  vi = {
    firstDayOfWeek: 1,
    dayNames: [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy"
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12'
    ],
    monthNamesShort: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12'
    ],
    today: 'Hôm nay',
    clear: 'Xóa'
  };

  _prevValue?: any;
  _controlModelData?: any;
  hideTransitionOptions = '195ms ease-in';
  showTransitionOptions = '225ms ease-out';

  constructor() {
  }

  ngOnInit() {
    if (this.control) {
      this.control._component = this;
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      if (!(obj instanceof Date)) {
        obj = new Date(String(obj));
      }

      if (this.isValidDate(obj)) {
        this._controlModelData = obj;
      }
    }
    else {
      this._controlModelData = null;
      if (this.calendar) {
        this.calendar.value = null;
        this.calendar.updateInputfield();
      }
    }
  }

  updateInputfield() {
    if (this.calendar) {
      this.calendar.updateInputfield();
    }
  }

  setValue(value: any) {
    if (this.calendar) {
      this.calendar.value = value;
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

  getPanelClass(): string {
    if (this.control.appendTo == 'body') {
      return `${this.control.panelClass} p-fixed`;
    }
    return this.control.panelClass ?? '';
  }

  onFocusCalendar(evt: any) {
    this.onFocus.emit({
      event: evt
    });

    if (evt.target.value) {
      evt.target.select();
    }
  }

  onBlurCalendar(evt: any) {
    this.onBlur.emit({
      event: evt
    });
  }

  onShowCalendar(evt: any) {
    this._prevValue = this._controlModelData;
  }

  onCloseCalendar(evt: any) {
    if (!this.calendar) return;
    const input = this.calendar.el.nativeElement.querySelector('input');
    const value = input.value.trim();
    const oldValue = this.toDateString(this._prevValue);
    if (oldValue != value) {
      input.value = this.autoCorectDateTime(value);
      if (oldValue != input.value) {
        this.fireChangeEvent();
      }
    }
    this.onClose.next(this._controlModelData);
  }

  onSelectDateTime(evt: any) {
    this.onSelect.next(this._controlModelData);
  }

  private autoCorectDateTime(input: string) {
    if (input != '') {
      const dateValue = input;
      const result = this.processDateInput(dateValue);

      this._controlModelData = result;
    }
    else {
      this._controlModelData = null;
    }

    return this.toDateString(this._controlModelData);
  }

  private processDateInput(inputValue: string): Date | null {
    if (!inputValue) {
      return null;
    }

    if (this.isIntegerString(inputValue)) {
      const number = Number(inputValue);
      const hNow = new Date().getHours();
      const mNow = new Date().getMinutes();
      const sNow = new Date().getHours();

      if (number > 99) {
        if (inputValue.length === 8) {
          const day = +inputValue.substr(0, 2);
          const month = +inputValue.substr(2, 2);
          const year = +inputValue.substr(4, 4);

          if (month > 12 || month < 1) {
            return null;
          }

          const maxDay = this.getMaxDayInMonthAndYear(month, year);
          if (day > maxDay || day < 1) {
            return null;
          }

          const r = new Date(year, month - 1, day);
          return r;
        }
        else if (inputValue.length === 6) {
          // 010119
          const day = +inputValue.substr(0, 2);
          const month = +inputValue.substr(2, 2);
          const year = +('20' + inputValue.substr(4, 2).toString());

          if (month > 12 || month < 1) {
            return null;
          }

          const maxDay = this.getMaxDayInMonthAndYear(month, year);
          if (day > maxDay || day < 1) {
            return null;
          }

          const r = new Date(year, month - 1, day);
          return r;
        }
        else if (inputValue.length === 4) {
          // 0101
          const day = +inputValue.substr(0, 2);
          const month = +inputValue.substr(2, 2);
          const year = this.getCurrentYear();

          if (month > 12 || month < 1) {
            return null;
          }

          const maxDay = this.getMaxDayInMonthAndYear(month, year);
          if (day > maxDay || day < 1) {
            return null;
          }

          const r = new Date(year, month - 1, day);
          return r;
        }
        else {
          return null;
        }
      }
      else if (number > -100) {
        const r = this.addDays(new Date(), number);
        return r;
      }
    }
    else {
      inputValue = inputValue.replace(/-/g, '/');
      try {
        const tryParseDate = this.tryParseExtractDate(
          inputValue,
          'DD/MM/YYYY',
        );
        if (tryParseDate + '' != 'Invalid Date') {
          return tryParseDate;
        }
      }
      catch {
      }
    }
    return null;
  }

  private getMaxDayInMonthAndYear(month: number, year: number): number {
    const d = new Date(year, month, 0);
    return d.getDate();
  }

  private isIntegerString(str: string) {
    if (!str) {
      return false;
    }
    while (str.indexOf('0') == 0) {
      str = str.substring(1);
    }
    if (str == '') {
      return true;
    }
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str;
  }

  private getCurrentYear(): number {
    return new Date().getFullYear();
  }

  private tryParseExtractDate(dateValue: string, format: string) {
    const day = moment(dateValue, format);
    if (day) {
      return day.toDate();
    }

    return null;
  }

  private addDays(date: Date, days: number) {
    const cloned = new Date(date);
    cloned.setDate(date.getDate() + days);
    return cloned;
  }

  private toDateString(date: Date) {
    if (this.isValidDate(date)) {
      let dd = String(date.getDate());
      if (dd.length == 1) dd = '0' + dd;
      let MM = String(date.getMonth() + 1);
      if (MM.length == 1) MM = '0' + MM;
      const yyyy = String(date.getFullYear());

      return `${dd}/${MM}/${yyyy}`;
    }
    return '';
  }

  private fireChangeEvent() {
    const value = this._controlModelData;
    if (this.onChange) {
      this.onChange(value);
    }
    this.onChanged.emit(value);
  }

  private isValidDate(date: any) {
    return date instanceof Date && !isNaN(date.getTime());
  };

}
