import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_KhuVucService } from '../services/dm-khuvuc.service';

@Component({
  selector: 'dm-khuvuc-form',
  templateUrl: './dm-khuvuc-form.component.html',
  styleUrls: ['./dm-khuvuc-form.component.scss']
})
export class DM_KhuVucFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_KhuVucService: DM_KhuVucService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_KhuVucService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên khu vực',
        required: true,
        width: 12
      }),


    ];
  }
}
