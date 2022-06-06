import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, MaskControlSchema, DateTimeControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TpHoSoService } from '../../dm-tphoso/services/dm-tphoso.service';
import { DotNhapHocService } from '../../dotnhaphoc/services/dotnhaphoc.service';
import { DotNhapHoc_HoSoService } from '../services/dotnhaphoc-hoso.service';

@Component({
  selector: 'dotnhaphoc-hoso-form',
  templateUrl: './dotnhaphoc-hoso-form.component.html',
  styleUrls: ['./dotnhaphoc-hoso-form.component.scss']
})
export class DotNhapHoc_HoSoFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dotnhaphoc_hosoService: DotNhapHoc_HoSoService,
    private _DotNhapHocService: DotNhapHocService,
    private _dm_TpHoSoService: DM_TpHoSoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dotnhaphoc_hosoService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idDotNhapHoc',
        label: 'Đợt nhập học',
        service: this._DotNhapHocService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idTpHoSo',
        label: 'Tên hồ sơ',
        service: this._dm_TpHoSoService,
        required: true,
      }),
      new MaskControlSchema({
        field: 'soLuongBanChinh',
        label: 'Số lượng bản chính',
        required: true,
        width: 6
      }),
      new MaskControlSchema({
        field: 'soLuongBanSao',
        label: 'Số lượng bản sao',
        required: true,
        width: 6
      }),
      new MaskControlSchema({
        field: 'soLuongBanCC',
        label: 'Số lượng bản công chứng',
        required: true,
        width: 6
      }),

    ];
  }
}
