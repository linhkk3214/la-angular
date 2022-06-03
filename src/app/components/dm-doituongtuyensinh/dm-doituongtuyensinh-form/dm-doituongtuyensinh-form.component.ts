import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_DoiTuongTuyenSinhService } from '../services/dm-doituongtuyensinh.service';
@Component({
  selector: 'dm-doituongtuyensinh-form',
  templateUrl: './dm-doituongtuyensinh-form.component.html',
  styleUrls: ['./dm-doituongtuyensinh-form.component.scss']
})
export class DM_DoiTuongTuyenSinhFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_DoiTuongTuyenSinhService: DM_DoiTuongTuyenSinhService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_DoiTuongTuyenSinhService;
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
      })
    ];
  }
}
