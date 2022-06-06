import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TrinhDoDaoTaoService } from '../../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
import { DM_NganhService } from '../services/dm-nganh.service';

@Component({
  selector: 'dm-nganh-form',
  templateUrl: './dm-nganh-form.component.html',
  styleUrls: ['./dm-nganh-form.component.scss']
})
export class DM_NganhFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_NganhService: DM_NganhService,
    private _dm_TrinhDoDaoTaoService: DM_TrinhDoDaoTaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_NganhService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idTrinhDoDaoTao',
        label: 'Trình độ đào tạo',
        service: this._dm_TrinhDoDaoTaoService
      }),
      new TextControlSchema({
        field: 'ma',
        label: 'Mã ngành',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'maNganhTheoBo',
        label: 'Mã ngành theo Bộ ',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên ngành ',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'tenNganhTA',
        label: 'Tên ngành (EN)'
      })
    ];
  }
}
