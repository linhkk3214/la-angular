import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachLopHanhChinhService } from './services/danhsachlophanhchinh.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoCanBoService } from '../user/services/hosocanbo';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
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
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
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
        width: '120px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên lớp',
        width: '250px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
        width: '200px',

      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService,
        width: '170px',

      }),
      new ColumnSchema({
        field: 'idKhoaVien',
        label: 'Khoa/Viện',
        service: this._dm_KhoaVienService,
        width: '200px',

      }),
      new ColumnSchema({
        field: 'idChuongTrinhDaoTao',
        label: 'Ngành',
        service: this._dm_CTĐTService,
        width: '170px',
      }),
      new ColumnSchema({
        field: 'idGVCN',
        label: 'Giáo viên chủ nhiệm',
        service: this._HoSoCanBoService
      }),
      new ColumnSchema({
        field: 'siSo',
        width: '100px',
        label: 'Sĩ số'
      }),
    ];
    super.ngOnInit();
  }
}
