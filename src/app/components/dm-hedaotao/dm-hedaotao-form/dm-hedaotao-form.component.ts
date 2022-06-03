import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../services/dm-hedaotao.service';

@Component({
  selector: 'dm-hedaotao-form',
  templateUrl: './dm-hedaotao-form.component.html',
  styleUrls: ['./dm-hedaotao-form.component.scss']
})
export class DM_HeDaoTaoFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_HeDaoTaoService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên hệ',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'tenTiengAnh',
        label: 'Tên tiếng anh',
        width: 12
      })
    ];
  }
}
