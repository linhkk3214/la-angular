import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachLoaiQuyetDinhService } from './services/danhsachloaiquyetdinh.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_TrangThaiNguoiHocService } from '../dm-trangthainguoihoc/services/dm-trangthainguoihoc.service';
@Component({
  selector: 'danhsachloaiquyetdinh',
  templateUrl: './danhsachloaiquyetdinh.component.html',
  styleUrls: ['./danhsachloaiquyetdinh.component.scss']
})
export class DanhSachLoaiQuyetDinhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _danhSachLoaiQuyetDinhService: DanhSachLoaiQuyetDinhService,
    private _dm_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'loại quyết định';
    this.setting.service = this._danhSachLoaiQuyetDinhService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên loại quyết định',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'trangThaiNganh1',
        label: 'Trạng thái ngành 1 sau duyệt',
        service: this._dm_TrangThaiNguoiHocService,
      }),
      new ColumnSchema({
        field: 'trangThaiNganh2',
        label: 'Trạng thái ngành 2 sau duyệt',
        service: this._dm_TrangThaiNguoiHocService,
      }),
    ];
    super.ngOnInit();
  }
}
