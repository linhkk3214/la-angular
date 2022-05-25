import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_LoaiNguoiDungService } from '../services/dm-loainguoidung.service';

@Component({
  selector: 'dm-loainguoidung-form',
  templateUrl: './dm-loainguoidung-form.component.html',
  styleUrls: ['./dm-loainguoidung-form.component.scss']
})
export class DM_LoaiNguoiDungFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_LoaiNguoiDungService: DM_LoaiNguoiDungService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_LoaiNguoiDungService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ten',
        label: 'Tên loại',
        required: true
      }),
      new TextControlSchema({
        field: 'ma',
        label: 'Mã loại',
        required: true
      }),
      new TextAreaControlSchema({
        field: 'moTa',
        label: 'Mô tả',
        width: 12
      })
    ];
  }
}
