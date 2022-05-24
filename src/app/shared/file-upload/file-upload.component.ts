import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { FileControlSchema } from '../models/schema';

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
export class FileUploadComponent implements OnInit {
  onChange?: Function;
  onTouched?: Function;
  @ViewChild(FileUpload) fileUpload: FileUpload;
  @Input() control?: FileControlSchema;
  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

  value: any[] = [];
  constructor(

  ) { }

  ngOnInit(): void {
    if (this.control) {
      this.control._component = this;
    }
  }

  writeValue(obj: any): void {
    if (!obj) this.value = [];
    else {
      this.value = obj;
    }
  }

  triggerUpload() {
    this.fileUpload.advancedFileInput.nativeElement.click();
  }

  handleFileUploaded(evt) {
    if (evt.originalEvent.status == 200) {
      this.value.push({ ...evt.originalEvent.body });
    }
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
