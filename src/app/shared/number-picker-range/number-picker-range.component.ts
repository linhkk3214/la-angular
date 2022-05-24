import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'tn-number-picker-range',
    templateUrl: './number-picker-range.component.html',
    styleUrls: ['./number-picker-range.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberPickerRangeComponent),
            multi: true
        }
    ]
})
export class NumberPickerRangeComponent implements OnInit, ControlValueAccessor {

    model: any[] = [null, null];
    onChange: Function;
    onTouched: Function;
    @Input() readonly = false;
    @Input() maskType: 'decimal' | 'int' = 'decimal';
    @Input() placeholder = '';
    @Input() disabled: boolean = null;
    @Input() suffix = '';
    @Input() prefix = '';
    @Input() min: number;
    @Input() max: number;
    @Input() decimalPlaces = 2;
    @Output() focus = new EventEmitter<any>();
    @Output() enterSmart = new EventEmitter<any>();
    @Output() enter = new EventEmitter<any>();
    @Output() blur = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();

    constructor(
        private _numberPipe: DecimalPipe
    ) { }

    ngOnInit() {
    }

    clear() {
        let re = (this.model[0] != null && this.model[0] !== '') || (this.model[1] != null && this.model[1] !== '');
        this.model = [null, null];
        this.onChange(this.model);
        return re
    }

    writeValue(obj: any): void {
        if (obj != null && obj != '')
            this.model = obj;
        else
            this.model = [null, null];
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

    getMaskByType(maskType) {
        if (maskType === 'decimal')
            return `separator.${this.decimalPlaces}`;
        return 'separator.0';
    }

    getThousandSeperator() {
        return '.';
    }

    checkValueInRange() {
        if (!this.model || this.maskType != 'int') {
            return;
        }

        if (this.min) {
            const min = Number(this.min);
            if (Number(this.model[0]) < min)
                this.model[0] = min;
            if (Number(this.model[1]) < min)
                this.model[1] = min;
        }
        if (this.max) {
            const max = Number(this.max);
            if (Number(this.model[0]) > max)
                this.model[0] = max;
            if (Number(this.model[1]) > max)
                this.model[1] = max;
        }
    }

    onChanged(evt) {
        this.enter.next(evt);
        this.compareAndEmit();
    }

    onFocus(evt, index: number) {
        this.focus.emit({
            event: evt,
            index
        });
    }

    compareAndEmit() {
        this.checkValueInRange();

        let value = [null, null];
        if (this.model[0] != null) {
            value[0] = Number(this.model[0]);
            if (this.model[1] != null) {
                value[1] = Number(this.model[1]);
                if (value[0] > value[1]) {
                    value = value.reverse();
                }
            }
        }
        else {
            if (this.model[1] != null)
                value[1] = Number(this.model[1]);
        }
        this.onChange(value);
        this.model[0] = value[0];
        this.model[1] = value[1];
        this.change.emit(value);
    }
}

