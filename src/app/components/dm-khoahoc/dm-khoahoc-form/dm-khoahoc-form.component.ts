import { Component, Injector, OnInit } from '@angular/core';
import { DropdownControlSchema, TextControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_NamHocService } from '../../dm-namhoc/services/dm-namhoc.service';
import { DM_KhoaHocService } from '../services/dm-khoahoc.service';

@Component({
  selector: 'dm-khoahoc-form',
  templateUrl: './dm-khoahoc-form.component.html',
  styleUrls: ['./dm-khoahoc-form.component.scss']
})
export class DM_KhoaHocFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_NamHocService: DM_NamHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dm_KhoaHocService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã khóa học',
        required: true,
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên khóa học',
        required: true,
      }),
      new DropdownControlSchema({
        field: 'namHocBatDau',
        label: 'Năm học bắt đầu',
        required: true,
        service: this._dm_NamHocService,
        valueField: 'nam',
      }),
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        required: true,
        service: this._dm_HeDaoTaoService
      })
    ];
  }
}
