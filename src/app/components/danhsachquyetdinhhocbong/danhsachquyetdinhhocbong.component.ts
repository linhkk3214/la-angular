import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DanhSachQuyetDinhHocBongService } from './services/danhsachquyetdinhhocbong.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_KhoaVienService } from '../dm-khoavien/services/dm-khoavien.service';
import { HoSoCanBoService } from '../user/services/hosocanbo';
import { DM_ChuongTrinhDaoTaoService } from '../dm-chuongtrinhdaotao/services/dm-chuongtrinhdaotao.service';
import { DanhSachLopHanhChinhService } from '../danhsachlophanhchinh/services/danhsachlophanhchinh.service';
import { DM_NganhService } from '../dm-nganh/services/dm-nganh.service';
import { HoSoNguoiHocService } from '../hosonguoihoc/services/hosonguoihoc.service';
import { DM_HocKyService } from '../dm-hocky/services/dm-hocky.service';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';
import { DataType } from 'src/app/shared/models/enums';
import { DanhSachLoaiKhenThuongService } from '../danhsachloaikhenthuong/services/danhsachloaikhenthuong.service';
import { DanhMucHocBongService } from '../danhmuchocbong/services/danhmuchocbong.service';
@Component({
  selector: 'danhsachquyetdinhhocbong',
  templateUrl: './danhsachquyetdinhhocbong.component.html',
  styleUrls: ['./danhsachquyetdinhhocbong.component.scss']
})
export class DanhSachQuyetDinhHocBongComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _danhSachQuyetDinhHocBongService: DanhSachQuyetDinhHocBongService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_HoSoNguoiHocService: HoSoNguoiHocService,
    private _dm_CTĐTService: DM_ChuongTrinhDaoTaoService,
    private _DanhSachLopHanhChinhService: DanhSachLopHanhChinhService,
    private _dm_NganhService: DM_NganhService,
    private _HoSoCanBoService: HoSoCanBoService,
    private _DanhSachLoaiKhenThuongService: DanhSachLoaiKhenThuongService,
    private _danhMucHocBongService: DanhMucHocBongService,

  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'quyết định học bổng';
    this.setting.service = this._danhSachQuyetDinhHocBongService;
    this.setting.popupSize.width = 1300;
    this.setting.popupSize.height = 700;
    this.setting.cols = [
      new ColumnSchema({
        field: 'soQd',
        label: 'Số quyết định',
      }),
      new ColumnSchema({
        field: 'ngayQd',
        label: 'Ngày quyết định',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        service: this._dm_NamHocService,
      }),
      new ColumnSchema({
        field: 'idHocKy',
        label: 'Học kỳ',
        service: this._dm_HocKyService,
      }),
      new ColumnSchema({
        field: 'idHocBong',
        label: 'Học bổng',
        service: this._danhMucHocBongService,
      }),
      new ColumnSchema({
        field: 'idNguoiKy',
        label: 'Người ký',
        service: this._HoSoCanBoService,
        funcGetLabel: item => {
          return `${item.ten} (${item.ma})`;
        },
      })
    ];
    super.ngOnInit();
  }
}
