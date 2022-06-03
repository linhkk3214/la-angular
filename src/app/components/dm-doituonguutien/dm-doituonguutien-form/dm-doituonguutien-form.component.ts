import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_DoiTuongUuTienService } from '../services/dm-doituonguutien.service';

@Component({
  selector: 'dm-doituonguutien-form',
  templateUrl: './dm-doituonguutien-form.component.html',
  styleUrls: ['./dm-doituonguutien-form.component.scss']
})
export class DM_DoiTuongUuTienFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_DoiTuongUuTienService: DM_DoiTuongUuTienService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_DoiTuongUuTienService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 12
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên đối tượng',
        required: true,
        width: 12
      }),


    ];
  }
}
