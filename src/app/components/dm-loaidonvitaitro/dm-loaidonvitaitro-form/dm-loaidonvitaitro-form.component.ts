import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_LoaiDonViTaiTroService } from '../services/dm-loaidonvitaitro.service';

@Component({
  selector: 'dm-loaidonvitaitro-form',
  templateUrl: './dm-loaidonvitaitro-form.component.html',
  styleUrls: ['./dm-loaidonvitaitro-form.component.scss']
})
export class DM_LoaiDonViTaiTroFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_LoaiDonViTaiTroService: DM_LoaiDonViTaiTroService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_LoaiDonViTaiTroService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên loại đơn vị',
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
