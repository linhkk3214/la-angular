import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTimeRangeControlSchema } from '../models/schema';

@Component({
  selector: 'tn-datetime-picker-range',
  templateUrl: './tn-datetime-picker-range.component.html',
  styleUrls: ['./tn-datetime-picker-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerRangeComponent),
      multi: true
    }
  ]
})
export class DatetimePickerRangeComponent implements OnInit {

  @Input() control: DateTimeRangeControlSchema = new DateTimeRangeControlSchema();
  @Input() disabled: boolean;

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

  _controlModelData: Date[] = [undefined, undefined];

  constructor(
  ) { }

  ngOnInit() {
  }

  clear() {
    let re = (this._controlModelData[0] != null) || (this._controlModelData[1] != null);
    this._controlModelData = [undefined, undefined];
    return re;
  }

  handleChanged(evt) {
    if (this._controlModelData[0] && this._controlModelData[1] && this._controlModelData[0] > this._controlModelData[1]) {
      this.onChanged.next({
        childEvent: evt,
        value: [this._controlModelData[1], this._controlModelData[0]]
      });
      return;
    }

    this.onChanged.next({
      childEvent: evt,
      value: this._controlModelData
    });
  }

  handleCloseCalendar(evt) {
    if (this._controlModelData[0] && this._controlModelData[1] && this._controlModelData[0] > this._controlModelData[1]) {
      this.onClose.next({
        childEvent: evt,
        value: [this._controlModelData[1], this._controlModelData[0]]
      });
      return;
    }

    this.onClose.next({
      childEvent: evt,
      value: this._controlModelData
    });
  }
}
