import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachLopHanhChinhService } from './services/danhsachlophanhchinh.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { DM_NganhService } from '../dm-nganh/services/dm-nganh.service';
import { HoSoCanBoService } from '../user/services/hosocanbo';
@Component({
  selector: 'danhsachlophanhchinh',
  templateUrl: './danhsachlophanhchinh.component.html',
  styleUrls: ['./danhsachlophanhchinh.component.scss']
})
export class DanhSachLopHanhChinhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_KhoaVienService: DM_KhoaVienService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'lớp hành chính';
    this.setting.service = this._DanhSachLopHanhChinhService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 500;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '200px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên lớp',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService
      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService
      }),
      new ColumnSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        service: this._dm_KhoaHocService
      }),
      new ColumnSchema({
        field: 'idNganh',
        label: 'Ngành',
        service: this._dm_NganhService
      }),
      new ColumnSchema({
        field: 'siSo',
        width: '150px',
        label: 'Sĩ số'
      }),
    ];
    super.ngOnInit();
  }
}
