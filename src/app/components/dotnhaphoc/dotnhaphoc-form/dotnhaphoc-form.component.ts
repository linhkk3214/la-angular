import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema, MaskControlSchema, DateTimeControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_CoSoDaoTaoService } from '../../dm-cosodaotao/services/dm-cosodaotao.service';
import { DM_DonViLienKetService } from '../../dm-donvilienket/services/dm-donvilienket.service';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../../dm-khoahoc/services/dm-khoahoc.service';
import { DM_TrinhDoDaoTaoService } from '../../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
import { DataSourceTrangThai } from '../models/const';
import { DotNhapHocService } from '../services/dotnhaphoc.service';

@Component({
  selector: 'dotnhaphoc-form',
  templateUrl: './dotnhaphoc-form.component.html',
  styleUrls: ['./dotnhaphoc-form.component.scss']
})
export class DotNhapHocFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _dotnhaphocService: DotNhapHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_CoSoDaoTaoService: DM_CoSoDaoTaoService,
    private _dm_DonViLienKetService: DM_DonViLienKetService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._dotnhaphocService;
    this.setting.schema = [
      new DropdownControlSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
        required: true
      }),
      new DropdownControlSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService,
        required: true,
      }),
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên đợt',
        required: true,
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'timeBd',
        label: 'Thời gian bắt đầu',
        width: 6
      }),
      new DateTimeControlSchema({
        field: 'timeKt',
        label: 'Thời gian kết thúc'
      }),
      new DropdownControlSchema({
        field: 'idCoSoDaoTao',
        label: 'Cơ sở đào tạo',
        service: this._dm_CoSoDaoTaoService
      }),
      new DropdownControlSchema({
        field: 'idDonViLienKet',
        label: 'Đơn vị liên kết',
        service: this._dm_DonViLienKetService
      }),
      new DropdownControlSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThai
      }),
      new TextAreaControlSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        width: 6
      }),
    ];
  }
}
