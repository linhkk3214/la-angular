import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_LoaiGiayToService } from '../services/dm-loaigiayto.service';

@Component({
  selector: 'dm-loaigiayto-form',
  templateUrl: './dm-loaigiayto-form.component.html',
  styleUrls: ['./dm-loaigiayto-form.component.scss']
})
export class DM_LoaiGiayToFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_LoaiGiayToService: DM_LoaiGiayToService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_LoaiGiayToService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã loại',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên loại',
        required: true,
        width: 12
      }),


    ];
  }
}
