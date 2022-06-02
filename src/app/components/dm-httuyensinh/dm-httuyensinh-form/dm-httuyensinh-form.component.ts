import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HtTuyenSinhService } from '../services/dm-httuyensinh.service';

@Component({
  selector: 'dm-httuyensinh-form',
  templateUrl: './dm-httuyensinh-form.component.html',
  styleUrls: ['./dm-httuyensinh-form.component.scss']
})
export class DM_HtTuyenSinhFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HtTuyenSinhService: DM_HtTuyenSinhService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_HtTuyenSinhService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên hình thức',
        required: true,
        width: 12
      }),


    ];
  }
}
