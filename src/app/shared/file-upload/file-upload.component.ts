import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { ComponentBase } from '../base-class/component-base';
import { Operator } from '../models/enums';
import { FileControlSchema } from '../models/schema';
import { FileService } from '../services/file.service';
import { isLiteralObject } from '../utils/common';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent extends ComponentBase implements OnInit {
  onChange?: Function;
  onTouched?: Function;
  @ViewChild(FileUpload) fileUpload: FileUpload;
  @Input() control?: FileControlSchema;
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

  disabled = false;

  value: any[] = [];
  rawValue: any[];
  constructor(
    injector: Injector,
    private _fileService: FileService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.control) {
      this.control._component = this;
    }
  }

  writeValue(obj: any): void {
    if (!obj) this.value = [];
    else {
      if (Array.isArray(obj)) {
        if (obj.length && isLiteralObject(obj[0])) {
          this.value = obj;
        }
        else {
          this.rawValue = obj;
        }
      }
      else {
        if (isLiteralObject(obj)) {
          this.value = [obj];
        }
        else {
          this.rawValue = [obj];
        }
      }

      this.getFileFromServer();
    }
  }

  async getFileFromServer() {
    if (!this.rawValue) return;
    const lstFile = (await this._fileService.getDetailByFilter([
      this.newFilter('id', Operator.in, this.rawValue)
    ])).data;
    this.value = lstFile;
  }

  triggerUpload() {
    this.fileUpload.advancedFileInput.nativeElement.click();
  }

  handleFileUploaded(evt) {
    if (evt.originalEvent.status == 200) {
      this.value.push({ ...evt.originalEvent.body });
      this.fireEvent();
    }
    if (!this.control.multiple) {
      if (this.value && this.value.length) {
        this.disabled = true;
      }
    }
  }

  fireEvent() {
    let value = this.value;
    if (!this.control.multiple) {
      if (this.value && this.value.length) {
        value = this.value[0];
      }
      else {
        value = null;
      }
    }

    this.onChange(value);
    this.onChanged.emit(value);
  }

  removeRow(index: number) {
    this.value.splice(index, 1);
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
}
