import { Component, Injector, OnInit } from '@angular/core';
import { DropdownControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_LoaiNguoiDungService } from '../../dm-loainguoidung/services/dm-loainguoidung.service';
import { DM_ChucVuService } from '../services/dm-chucvu.service';

@Component({
  selector: 'dm-chucvu-form',
  templateUrl: './dm-chucvu-form.component.html',
  styleUrls: ['./dm-chucvu-form.component.scss']
})
export class DM_ChucVuFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_ChucVuService: DM_ChucVuService,
    private _dm_LoaiNguoiDungService: DM_LoaiNguoiDungService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_ChucVuService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        required: true
      }),
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true
      }),
      new DropdownControlSchema({
        field: 'idLoaiNguoiDung',
        label: 'Loại người dùng',
        service: this._dm_LoaiNguoiDungService
      }),
    ];
  }
}
