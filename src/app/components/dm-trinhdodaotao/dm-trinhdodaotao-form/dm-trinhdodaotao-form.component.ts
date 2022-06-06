import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TrinhDoDaoTaoService } from '../services/dm-trinhdodaotao.service';

@Component({
  selector: 'dm-trinhdodaotao-form',
  templateUrl: './dm-trinhdodaotao-form.component.html',
  styleUrls: ['./dm-trinhdodaotao-form.component.scss']
})
export class DM_TrinhDoDaoTaoFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_TrinhDoDaoTaoService: DM_TrinhDoDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_TrinhDoDaoTaoService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên trình độ',
        required: true,
        width: 6
      }),
      new MaskControlSchema({
        field: 'capDo',
        required: true,
        label: 'Cấp độ'
      })
    ];
  }
}
