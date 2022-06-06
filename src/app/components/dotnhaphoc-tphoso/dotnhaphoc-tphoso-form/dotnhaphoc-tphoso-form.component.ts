import { Component, Injector, Input, OnInit } from '@angular/core';
import { CheckBoxControlSchema, DropdownControlSchema, MaskControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_TpHoSoService } from '../../dm-tphoso/services/dm-tphoso.service';
import { DotNhapHoc_TpHoSoService } from '../services/dotnhaphoc-tphoso.service';

@Component({
  selector: 'dotnhaphoc-tphoso-form',
  templateUrl: './dotnhaphoc-tphoso-form.component.html',
  styleUrls: ['./dotnhaphoc-tphoso-form.component.scss']
})
export class DotNhapHoc_TpHoSoFormComponent extends FormBase implements OnInit {
  @Input() idDotNhapHoc: string;
  constructor(
    injector: Injector,
    private _dotNhapHoc_TpHoSoService: DotNhapHoc_TpHoSoService,
    private _dm_TpHoSoService: DM_TpHoSoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dotNhapHoc_TpHoSoService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idTpHoSo',
        label: 'Hồ sơ',
        service: this._dm_TpHoSoService,
      }),
      new MaskControlSchema({
        field: 'soLuongBanChinh',
        label: 'Bản chính',
        required: true,
        suffix: 'Bản',
      }),
      new MaskControlSchema({
        field: 'soLuongBanSao',
        label: 'Bản sao',
        required: true,
        suffix: 'Bản',
      }),
      new MaskControlSchema({
        field: 'soLuongBanCC',
        label: 'Bản công chứng',
        required: true,
        suffix: 'Bản',
      }),
      new CheckBoxControlSchema({
        field: 'nopOnline',
        label: 'Nộp online',
        width: 3,
      }),
      new CheckBoxControlSchema({
        field: 'nopTrucTiep',
        label: 'Nộp trực tiếp',
        width: 3,
      }),
    ];
    if (!this.model.data.nopOnline) {
      this.model.data.nopOnline = false;
    }
    if (!this.model.data.nopTrucTiep) {
      this.model.data.nopTrucTiep = false;
    }
  }

  override onBeforeSave() {
    this.model.data.idDotNhapHoc = this.idDotNhapHoc;
  }
}
