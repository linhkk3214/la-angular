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

  // Hàm write value này là 1 hàm mặc định của angular
  // Sẽ chạy bất cứ khi nào có dữ liệu mới truyền vào cho file-upload
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

    this.checkDisabled();
  }

  checkDisabled() {
    this.disabled = false;
    if (!this.control.multiple) {
      if ((this.value && this.value.length)
        || (this.rawValue && this.rawValue.length)
      ) {
        this.disabled = true;
      }
    }
  }

  // Hàm load file dựa trên các id được truyền vào
  async getFileFromServer() {
    if (!this.rawValue) return;
    const lstFile = (await this._fileService.getAllByFilter([
      this.newFilter('_id', Operator.in, this.rawValue)
    ])).data;
    this.rawValue = null;
    lstFile.forEach(file => {
      file.downloadUrl = `http://localhost:3000/file/download/${file.url}`;
      file.saved = true
    });
    this.value = lstFile;
  }

  triggerUpload() {
    this.fileUpload.advancedFileInput.nativeElement.click();
  }

  toggleAvatar() {
    if (this.control.isAvatar && this.value && this.value.length) {
      this.removeAvatar();
    }
    else {
      this.triggerUpload();
    }
  }

  handleFileUploaded(evt) {
    if (evt.originalEvent.status == 200) {
      const itemFile = evt.originalEvent.body;
      const lstInfo = [];
      const indexDot = itemFile.originalname.lastIndexOf('.');
      if (indexDot == -1) {
        lstInfo.push(itemFile.originalname, null);
      }
      else {
        lstInfo.push(
          itemFile.originalname.substring(0, indexDot),
          itemFile.originalname.substring(indexDot + 1).toLowerCase()
        )
      }
      // Chỗ này là xử lí khi file upload xong, sẽ đánh dấu là saved: false để lúc lưu đối tượng sẽ lưu file trước
      this.value.push({
        ...itemFile,
        _id: this.guid(),
        saved: false,
        name: lstInfo[0],
        extension: lstInfo[1],
        downloadUrl: this.getDownloadUrlFromUnSavedFile(itemFile)
      });
      this.fireEvent();
    }
    this.checkDisabled();
  }

  getDownloadUrlFromUnSavedFile(itemFile: any) {
    return `http://localhost:3000/file/download/temp/${itemFile.filename}`;
  }

  fireEvent() {
    let value = null;
    if (!this.control.multiple) {
      if (this.value && this.value.length) {
        value = this.value[0]._id;
      }
      else {
        value = null;
      }
    }
    else {
      value = this.value.map(q => q._id);
    }

    this.onChange(value);
    this.onChanged.emit(value);
  }

  removeRow(index: number) {
    this.value.splice(index, 1);
    this.fireEvent();
    this.checkDisabled();
  }

  removeAvatar() {
    this.value = [];
    this.fireEvent();
    this.checkDisabled();
  }

  // Hàm lưu file trước khi lưu đối tượng chính
  saveFile(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const lstFileSave = [];
        this.value.forEach(file => {
          if (file.saved) return;
          lstFileSave.push({ ...file, _id: null, tempId: file._id });
        });
        if (lstFileSave.length) {
          const resultSaveFile = (await this._fileService.saveFile(lstFileSave)).data;
          if (!resultSaveFile) resolve(false);
          this.value.forEach(file => {
            if (file.saved) return;
            const itemFileSaved = resultSaveFile.find(q => q.tempId == file._id);
            if (!itemFileSaved) return;
            file.saved = true;
            file._id = itemFileSaved._id;
          });
          this.fireEvent();
        }
        resolve(true);
      }
      catch (err) {
        resolve(false);
      }
    });
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
