import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_GioiTinhService } from '../services/dm-gioitinh.service';

@Component({
  selector: 'dm-gioitinh-form',
  templateUrl: './dm-gioitinh-form.component.html',
  styleUrls: ['./dm-gioitinh-form.component.scss']
})
export class DM_GioiTinhFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_GioiTinhService: DM_GioiTinhService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_GioiTinhService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên giới tính',
        required: true,
        width: 12
      }),


    ];
  }
}
