import { Component, Injector, OnInit } from '@angular/core';
import { DropdownControlSchema, TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_LoaiGiayToService } from '../../dm-loaigiayto/services/dm-loaigiayto.service';
import { DM_TpHoSoService } from '../services/dm-tphoso.service';

@Component({
  selector: 'dm-tphoso-form',
  templateUrl: './dm-tphoso-form.component.html',
  styleUrls: ['./dm-tphoso-form.component.scss']
})
export class DM_TpHoSoFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_TpHoSoService: DM_TpHoSoService,
    private _dm_LoaiGiayToService: DM_LoaiGiayToService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_TpHoSoService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'idLoaiGiayTo',
        label: 'Loại giấy tờ',
        service: this._dm_LoaiGiayToService,
        required: true
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'tenKhiNopOnline',
        label: 'Tên khi nộp online',
        width: 12,
        required: true,
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      }),
    ];
  }
}
