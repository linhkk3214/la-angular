import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TrangThaiNguoiHocService } from '../services/dm-trangthainguoihoc.service';

@Component({
  selector: 'dm-trangthainguoihoc-form',
  templateUrl: './dm-trangthainguoihoc-form.component.html',
  styleUrls: ['./dm-trangthainguoihoc-form.component.scss']
})
export class DM_TrangThaiNguoiHocFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_TrangThaiNguoiHocService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên trạng thái',
        required: true,
        width: 6
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      }),


    ];
  }
}
