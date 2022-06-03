import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_CoSoDaoTaoService } from '../services/dm-cosodaotao.service';

@Component({
  selector: 'dm-cosodaotao-form',
  templateUrl: './dm-cosodaotao-form.component.html',
  styleUrls: ['./dm-cosodaotao-form.component.scss']
})
export class DM_CoSoDaoTaoFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_CoSoDaoTaoService: DM_CoSoDaoTaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_CoSoDaoTaoService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên cơ sở',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'diaChi',
        label: 'Địa chỉ',
        required: true,
        width: 12
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 12
      }),


    ];
  }
}
