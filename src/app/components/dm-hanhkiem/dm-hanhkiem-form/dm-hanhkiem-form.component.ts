import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HanhKiemService } from '../services/dm-hanhkiem.service';

@Component({
  selector: 'dm-hanhkiem-form',
  templateUrl: './dm-hanhkiem-form.component.html',
  styleUrls: ['./dm-hanhkiem-form.component.scss']
})
export class DM_HanhKiemFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HanhKiemService: DM_HanhKiemService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_HanhKiemService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên hạnh kiểm',
        required: true,
        width: 12
      }),


    ];
  }
}
