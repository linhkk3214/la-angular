import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HocLucService } from '../services/dm-hocluc.service';

@Component({
  selector: 'dm-hocluc-form',
  templateUrl: './dm-hocluc-form.component.html',
  styleUrls: ['./dm-hocluc-form.component.scss']
})
export class DM_HocLucFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HocLucService: DM_HocLucService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_HocLucService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên học lực',
        required: true,
        width: 12
      }),


    ];
  }
}
