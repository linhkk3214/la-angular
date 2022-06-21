import { Component, Injector, Input, OnInit } from '@angular/core';
import { TextAreaControlSchema, TextControlSchema, DropdownControlSchema } from 'src/app/shared/models/schema';
import { FormBase } from '../../../shared/base-class/form-base';
import { DM_HeDaoTaoService } from '../../dm-hedaotao/services/dm-hedaotao.service';
import { DM_TrangThaiNguoiHocService } from '../../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
import { DanhSachLoaiQuyetDinhService } from '../services/danhsachloaiquyetdinh.service';

@Component({
  selector: 'danhsachloaiquyetdinh-form',
  templateUrl: './danhsachloaiquyetdinh-form.component.html',
  styleUrls: ['./danhsachloaiquyetdinh-form.component.scss']
})
export class DanhSachLoaiQuyetDinhFormComponent extends FormBase implements OnInit {
  constructor(
    injector: Injector,
    private _danhSachLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _dm_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.service = this._danhSachLoaiQuyetDinhService;
    this.setting.schema = [
      new TextControlSchema({
        field: 'ma',
        label: 'Mã',
        required: true,
        width: 6
      }),
      new TextControlSchema({
        field: 'ten',
        label: 'Tên loại quyết định',
        required: true,
        width: 6
      }),
      new DropdownControlSchema({
        field: 'trangThaiNganh1',
        label: 'Trạng thái ngành 1 sau duyệt',
        required: true,
        service: this._dm_TrangThaiNguoiHocService,
        width: 12
      }),
      new DropdownControlSchema({
        field: 'trangThaiNganh2',
        label: 'Trạng thái ngành 2 sau duyệt',
        service: this._dm_TrangThaiNguoiHocService,
        width: 12
      })
    ];
  }
}
